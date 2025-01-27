import { defineStore } from 'pinia'
import { EQUIPMENT_STORAGE } from 'src/stores/storageConfig'

export const useEquipmentStore = defineStore(EQUIPMENT_STORAGE, {
  state: () => ({
    equipments: [],
    position: [],
    history: [],
    models: [],
    states: [],
  }),
  actions: {
    setData(equipments) {
      this.equipments = equipments
    },
    setHistory(history) {
      this.history = history
    },
    setPosition(position) {
      this.position = position
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
