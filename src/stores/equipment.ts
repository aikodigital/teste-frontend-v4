import { defineStore } from 'pinia'
import { EQUIPMENT_STORAGE } from 'src/stores/storageConfig'

export const useEquipmentStore = defineStore(EQUIPMENT_STORAGE, {
  state: () => ({
    equipments: [],
    models: [],
    states: [],
  }),
  actions: {
    setData(equipments) {
      this.equipments = equipments
    },
    setModel(models) {
      this.models = models
    },
    setState(states) {
      this.states = states
    },
  },
  persist: {
    enabled: true,
  },
})
