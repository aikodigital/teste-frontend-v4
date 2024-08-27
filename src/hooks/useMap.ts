import { useState } from 'react';

import {
  EquipmentModel,
  StateHistory,
  Equipment,
  EquipmentStateHistory,
  EquipmentState,
  Position,
} from '../types/interface';

interface UseMapProps {
  equipment: Equipment[];
  models: EquipmentModel[];
  history: EquipmentStateHistory[];
  states: Record<string, EquipmentState>;
  positions: Record<string, Position[]>;
}

const useMap = ({ equipment, models, history, states }: UseMapProps) => {
  const [opened, setOpened] = useState(false);
  const [selectedEquipmentModel, setSelectedEquipmentModel] =
    useState<EquipmentModel | null>(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  );
  const [equipmentHistory, setEquipmentHistory] = useState<StateHistory[]>([]);
  const [filterState, setFilterState] = useState<string | null>(null);
  const [filterModel, setFilterModel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenDrawer = (id: string) => {
    const equip = equipment.find((e) => e.id === id);
    if (!equip) return;

    const equipModel = models.find(
      (model) => model.id === equip.equipmentModelId
    );
    if (!equipModel) return;

    setSelectedEquipmentId(id);
    setSelectedEquipmentModel(equipModel);
    setEquipmentHistory(
      history
        .filter((item) => item.equipmentId === id)
        .flatMap((item) => item.states)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
    setOpened(true);
  };

  const filteredEquipment = equipment.filter((equip) => {
    const equipmentModel = models.find(
      (model) => model.id === equip.equipmentModelId
    );

    const latestStateHistory = history
      .filter((item) => item.equipmentId === equip.id)
      .flatMap((item) => item.states)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

    const equipmentState = latestStateHistory
      ? states[latestStateHistory.equipmentStateId]
      : null;

    const isStateMatch = filterState
      ? equipmentState?.id === filterState
      : true;

    const isModelMatch = filterModel
      ? equipmentModel?.id === filterModel
      : true;

    const isSearchMatch = searchQuery
      ? equip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (equipmentModel &&
          equipmentModel.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    return isStateMatch && isModelMatch && isSearchMatch;
  });

  const calculateProductivity = (equipmentId: string) => {
    const EquipmentStateHistory = history.find(
      (item) => item.equipmentId === equipmentId
    );

    if (!EquipmentStateHistory) {
      return 0;
    }

    const operatingState = EquipmentStateHistory.states.filter(
      (state) => states[state.equipmentStateId].name === 'Operando'
    );

    const operatingHours = operatingState.reduce((total, state) => {
      const start = new Date(state.date);
      const end = new Date(state.date);
      const durationInHours =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      return total + durationInHours;
    }, 0);

    const totalHours = 24;
    const productivity = (operatingHours / totalHours) * 100;

    return Math.round(productivity);
  };

  return {
    opened,
    selectedEquipmentModel,
    equipmentHistory,
    selectedEquipmentId,
    handleOpenDrawer,
    setOpened,
    filterState,
    setFilterState,
    filterModel,
    setFilterModel,
    filteredEquipment,
    searchQuery,
    setSearchQuery,
    calculateProductivity,
  };
};

export default useMap;
