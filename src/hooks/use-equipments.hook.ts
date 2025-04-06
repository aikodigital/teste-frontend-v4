import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { ReduxState } from '~/redux/store';
import { EquipmentState } from '~/types/equipment-state.types';
import { Position } from '~/types/equipment-position-history.types';
import { EquipmentModel } from '~/types/equipment-model.types';

export interface Equipment {
  id: string;
  name: string;
  model: string;
  position: Position;
  state: EquipmentState;
}

export interface EquipmentFilters {
  model?: string;
  state?: string;
  name?: string;
}

export interface EquipmentsHook {
  data: Equipment[];
  model: EquipmentModel[];
  state: EquipmentState[];
  filters: EquipmentFilters;
  filtersModalOpen: boolean;
  updateFilter: (key: keyof EquipmentFilters, value: string) => void;
  clearFilters: () => void;
  toggleFilterModal: (value: boolean) => void;
}

export const useEquipmentsHook = (): EquipmentsHook => {
  const { equipments, position, model, stateHistory, state } = useSelector(
    (state: ReduxState) => state
  );

  const [filters, setFilters] = useState<EquipmentFilters>({});
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

  const toggleFilterModal = (value: boolean) => {
    setFiltersModalOpen(value);
  };

  const data = useMemo(() => {
    return equipments.data.map((equipment) => {
      const location = position.data.find(
        (item) => item.equipmentId === equipment.id
      );

      const current = state.data.find(
        (item) =>
          item.id ===
          stateHistory.data.find((item) => item.equipmentId === equipment.id)
            ?.states[0].equipmentStateId
      );

      const equipmentModel = model.data.find(
        (item) => item.id === equipment.equipmentModelId
      )?.name;

      return {
        ...equipment,
        position: location?.positions[0] as Position,
        state: current as EquipmentState,
        model: equipmentModel as string,
      };
    });
  }, [equipments, position, stateHistory, state, model]);

  const matchesFilter = (
    value: string | undefined,
    filter: string | undefined
  ): boolean => {
    if (!filter) return true;
    if (!value) return false;
    return value.toLowerCase().includes(filter.toLowerCase());
  };

  const filteredData = useMemo(() => {
    return data.filter((equipment) => {
      const matchesName =
        matchesFilter(equipment.name, filters.name) ||
        matchesFilter(equipment.model, filters.name);
      const matchesModel = matchesFilter(equipment.model, filters.model);
      const matchesState = matchesFilter(equipment.state?.name, filters.state);

      return matchesName && matchesModel && matchesState;
    });
  }, [data, filters]);

  const updateFilter = (key: keyof EquipmentFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters({});

  return {
    model: model.data,
    state: state.data,
    data: filteredData,
    filters,
    updateFilter,
    clearFilters,
    filtersModalOpen,
    toggleFilterModal,
  };
};
