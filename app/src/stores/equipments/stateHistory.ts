import { defineStore } from 'pinia';
import { useHistory, type HistoryRecord } from '@/composables/useHistory';

export type StateHistory = HistoryRecord & {
  equipmentStateId: string;
};

export const useStateHistoryStore = defineStore('stateHistory', () => {
  const [initStateHistory, getStateHistory] = useHistory<StateHistory, 'states'>();

  return {
    initStateHistory,
    getStateHistory,
  };
});
