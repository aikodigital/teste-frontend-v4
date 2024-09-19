import { defineStore } from 'pinia';
import { useHistory, type HistoryRecord } from '@/composables/useHistory';

export type PositionHistory = HistoryRecord & {
  lat: number;
  lon: number;
};

export const usePositionHistoryStore = defineStore('positionHistory', () => {
  const [initPositionHistory, getPositionHistory] = useHistory<PositionHistory, 'positions'>();

  return {
    initPositionHistory,
    getPositionHistory,
  };
});
