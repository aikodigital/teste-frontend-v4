import { defineStore } from 'pinia';
import { useEntity, type Entity } from '@/composables/useEntity';

type Model = Entity & {
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
  }[];
};

export const useModelStore = defineStore('model', () => {
  const [initModels, getModel] = useEntity<Model>();

  return { initModels, getModel };
});
