import { defineStore } from 'pinia';
import { useModelStore } from '@/stores/equipments/model';
import { useStateStore } from '@/stores/equipments/state';
import { useEquipmentStore } from '@/stores/equipments';
import { useStateHistoryStore } from '@/stores/equipments/stateHistory';
import { usePositionHistoryStore } from '@/stores/equipments/positionHistory';

import models from '@data/equipmentModel.json';
import states from '@data/equipmentState.json';
import equipments from '@data/equipment.json';
import positionHistory from '@data/equipmentPositionHistory.json';
import stateHistory from '@data/equipmentStateHistory.json';

export const useAppStore = defineStore('app', () => {
  const { initModels } = useModelStore();
  const { initStates } = useStateStore();
  const { initEquipments } = useEquipmentStore();
  const { initStateHistory } = useStateHistoryStore();
  const { initPositionHistory } = usePositionHistoryStore();

  const initApp = () => {
    initModels(models);
    initStates(states);
    initEquipments(equipments);
    initStateHistory(stateHistory);
    initPositionHistory(positionHistory);
  };

  return { initApp };
});
