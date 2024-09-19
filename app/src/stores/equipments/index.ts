import { defineStore } from 'pinia';
import { useEntity, type Entity } from '@/composables/useEntity';

import { useModelStore } from '@/stores/equipments/model';
import { useStateStore } from '@/stores/equipments/state';
import { usePositionHistoryStore } from '@/stores/equipments/positionHistory';
import { useStateHistoryStore } from '@/stores/equipments/stateHistory';

type Equipment = Entity & {
  equipmentModelId: string;
};

export const useEquipmentStore = defineStore('equipment', () => {
  const [initEquipments, getEquipment, equipments] = useEntity<Equipment>();

  const { getState } = useStateStore();
  const { getStateHistory } = useStateHistoryStore();
  const getEquipmentCurrentState = (equipmentId: string) =>
    getState(getStateHistory(equipmentId).current.equipmentStateId);

  const { getPositionHistory } = usePositionHistoryStore();
  const getEquipmentCurrentPosition = (equipmentId: string) =>
    getPositionHistory(equipmentId).current;

  const getEquipmentCurrentStatus = (equipmentId: string) => ({
    state: getEquipmentCurrentState(equipmentId),
    position: getEquipmentCurrentPosition(equipmentId),
  });

  const { getModel } = useModelStore();
  const getEquipmentPreview = (equipmentId: string) => {
    const equipment = getEquipment(equipmentId);
    const state = getEquipmentCurrentState(equipmentId);
    const model = getModel(equipment.equipmentModelId);

    return {
      name: equipment.name,
      state: state.name,
      model: model.name,
      link: `/equipment/${equipmentId}`,
    };
  };

  return {
    initEquipments,
    getEquipment,
    equipments,
    getEquipmentCurrentStatus,
    getEquipmentPreview,
  };
});
