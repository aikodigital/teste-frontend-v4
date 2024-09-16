import { defineStore } from 'pinia';
import models from '../data/equipmentModel.json';

export const getModels = defineStore('model', {
  state: () => ({
    models: models,
  }),
  getters: {
    modelOptions: (state) => state.models,
    getModelIcon: (state) => (modelId: string) => {
      const model = state.models.find((m) => m.id === modelId);
      switch (model?.name) {
        case 'Caminhão de carga':
          return 'fa-truck';
        case 'Harvester':
          return 'fa-tractor';
        case 'Garra traçadora':
          return 'fa-wrench';
      }
    },
  },
});
