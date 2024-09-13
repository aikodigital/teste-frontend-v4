import { defineStore } from 'pinia';
import models from '../data/equipmentModel.json';

export const useModelStore = defineStore('model', {
  state: () => ({
    models: models,
  }),
  getters: {
    modelOptions: (state) => state.models,
    getModelIcon: (state) => (modelId: string) => {
      const model = state.models.find((m) => m.id === modelId);
      switch (model?.name) {
        case 'Caminhão de carga':
          return 'mdi-truck';
        case 'Harvester':
          return 'mdi-tractor';
        case 'Garra traçadora':
          return 'mdi-boom-gate-arrow-down-outline';
        default:
          return 'mdi-help';
      }
    },
  },
});
