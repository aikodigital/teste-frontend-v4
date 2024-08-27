import { useState, useEffect } from 'react';
import {
  EquipmentModel,
  StateHistory,
  Equipment,
  EquipmentStateHistory,
  EquipmentState,
  Position
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

    const latestStateHistory = history
      .filter((item) => item.equipmentId === equip.id)
      .flatMap((item) => item.states)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    const equipmentState = latestStateHistory
      ? states[latestStateHistory.equipmentStateId]
      : null;

    const isStateMatch = filterState ? equipmentState?.id === filterState : true;
    const isModelMatch = filterModel ? equip.equipmentModelId === filterModel : true;

    return isStateMatch && isModelMatch;
  });



  useEffect(() => {
    if (selectedEquipmentId) {
      setEquipmentHistory(
        history
          .filter((item) => item.equipmentId === selectedEquipmentId)
          .flatMap((item) => item.states)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      );
    }
  }, [selectedEquipmentId, history]);

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
    filteredEquipment
  };
};

export default useMap;
