import { useCallback, useState } from 'react';

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

const useMap = ({
  equipment,
  models,
  history,
  states,
  positions,
}: UseMapProps) => {
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
  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [selectedEquipmentHistory, setSelectedEquipmentHistory] = useState<
    Position[]
  >([]);

  const findEquipmentModel = (equipmentId: string) => {
    const equip = equipment.find((e) => e.id === equipmentId);
    if (!equip) return null;
    return models.find((model) => model.id === equip.equipmentModelId) || null;
  };

  const getLatestState = (equipmentId: string) => {
    return history
      .filter((item) => item.equipmentId === equipmentId)
      .flatMap((item) => item.states)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
  };

  const handleOpenDrawer = useCallback(
    (id: string) => {
      const equipModel = findEquipmentModel(id);
      if (!equipModel) return;

      setSelectedEquipmentId(id);
      setSelectedEquipmentModel(equipModel);
      setEquipmentHistory(
        history
          .filter((item) => item.equipmentId === id)
          .flatMap((item) => item.states)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      );
      setOpened(true);
    },
    [history, equipment, models]
  );

  const handleFilterButtonClick = () => {
    setDrawerOpened(false);
    setTimeout(() => setFilterDrawerOpened(true), 300);
  };

  const handleViewHistory = (id: string) => {
    const equipmentPositions = positions[id] || [];
    setSelectedEquipmentHistory(equipmentPositions);
    setSelectedEquipmentId(id);

    setFilterDrawerOpened(false);

    setTimeout(() => {
      handleOpenDrawer(id);
      setDrawerOpened(true);
    }, 300);
  };

  const filteredEquipment = equipment.filter((equip) => {
    const equipmentModel = findEquipmentModel(equip.id);
    const latestStateHistory = getLatestState(equip.id);
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
        equipmentModel?.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return isStateMatch && isModelMatch && isSearchMatch;
  });

  const handleResetMap = () => {
    setSelectedEquipmentId(null);
    setSelectedEquipmentModel(null);
    setEquipmentHistory([]);
    setSelectedEquipmentHistory([]);
    setDrawerOpened(false);
    setFilterDrawerOpened(false);
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
    handleFilterButtonClick,
    handleViewHistory,
    filterDrawerOpened,
    drawerOpened,
    setDrawerOpened,
    setFilterDrawerOpened,
    setSelectedEquipmentHistory,
    selectedEquipmentHistory,
    handleResetMap,
  };
};

export default useMap;
