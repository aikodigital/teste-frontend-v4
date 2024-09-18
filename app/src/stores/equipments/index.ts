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

  const { getModel } = useModelStore();
  const getEquipmentModel = (equipment: Equipment) => getModel(equipment.equipmentModelId);

  const { getState } = useStateStore();
  const { getStateHistory } = useStateHistoryStore();
  const { getPositionHistory } = usePositionHistoryStore();
  const getEquipmentCurrentStatus = (equipmentId: string) => ({
    state: getState(getStateHistory(equipmentId).current.equipmentStateId),
    position: getPositionHistory(equipmentId).current,
  });

  return {
    initEquipments,
    getEquipment,
    equipments,
    getEquipmentModel,
    getEquipmentCurrentStatus,
  };
});
