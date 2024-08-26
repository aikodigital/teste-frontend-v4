import { useState, useEffect } from 'react';
import {
  EquipmentModel,
  StateHistory,
  Equipment,
  EquipmentStateHistory,
} from '../types/interface';

interface UseMapProps {
  equipment: Equipment[];
  models: EquipmentModel[];
  history: EquipmentStateHistory[];
}

const useMap = ({ equipment, models, history }: UseMapProps) => {
  const [opened, setOpened] = useState(false);
  const [selectedEquipmentModel, setSelectedEquipmentModel] =
    useState<EquipmentModel | null>(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  );
  const [equipmentHistory, setEquipmentHistory] = useState<StateHistory[]>([]);

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
  };
};

export default useMap;
