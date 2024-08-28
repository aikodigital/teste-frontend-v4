import { defineStore } from 'pinia'
import type { Equipment, EquipmentModel, EquipmentState, EquipmentStateHistory, EquipmentPositionHistory } from '../types'

export const useEquipmentStore = defineStore('equipment', {
  state: () => ({
    equipment: [] as Equipment[],
    equipmentModels: [] as EquipmentModel[],
    equipmentStates: [] as EquipmentState[],
    equipmentStateHistory: [] as EquipmentStateHistory[],
    equipmentPositionHistory: [] as EquipmentPositionHistory[],
    searchQuery: '' as string,
    filteredEquipment: [] as Equipment[], 
    currentStateFilter: null as string | null, 
    currentModelFilter: null as string | null, 
  }),
  actions: {
    async fetchData() {
      try {
      const [equipment, models, states, stateHistory, positionHistory] = await Promise.all([
        fetch('data/equipment.json').then(response => response.json()),
        fetch('data/equipmentModel.json').then(response => response.json()),
        fetch('data/equipmentState.json').then(response => response.json()),
        fetch('data/equipmentStateHistory.json').then(response => response.json()),
        fetch('data/equipmentPositionHistory.json').then(response => response.json()),
      ])
      this.equipment = equipment
      this.equipmentModels = models
      this.equipmentStates = states
      this.equipmentStateHistory = stateHistory
      this.equipmentPositionHistory = positionHistory
    } catch (error) {
      console.error('Falha ao buscar dados:', error)
    }
    },
    getLatestPosition(equipmentId: string) {
      const history = this.equipmentPositionHistory.find(h => h.equipmentId === equipmentId)
      return history?.positions.slice(-1)[0]
    },
    getLatestState(equipmentId: string) {
      const history = this.equipmentStateHistory.find(h => h.equipmentId === equipmentId)
      return history?.states.slice(-1)[0]
    },
    setStateFilter(stateId: string | null) {
      this.currentStateFilter = stateId
      this.applyFilters()
    },
    setModelFilter(modelId: string | null) {
      this.currentModelFilter = modelId
      this.applyFilters()
    },
    setSearchQuery(query: string) {
      this.searchQuery = query
      this.applyFilters()
    },
    applyFilters() {
      this.filteredEquipment = this.equipment.filter(eq => {
        const matchesState = !this.currentStateFilter || this.getLatestState(eq.id)?.equipmentStateId === this.currentStateFilter
        const matchesModel = !this.currentModelFilter || eq.equipmentModelId === this.currentModelFilter
        const matchesSearch = !this.searchQuery || eq.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        return matchesState && matchesModel && matchesSearch
      })
    },
  },
  getters: {
    stateHistory() {
      return (equipmentId: string) => {
        const history = this.equipmentStateHistory.find(h => h.equipmentId === equipmentId)
        return history?.states.map(state => ({
          ...state,
          stateName: this.equipmentStates.find(s => s.id === state.equipmentStateId)?.name
        })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }
    },
    getStateHistoryWithValues() {
      return (equipmentId: string) => {
        const history = this.stateHistory(equipmentId)
        const equipment = this.equipment.find(e => e.id === equipmentId)
        const model = this.equipmentModels.find(m => m.id === equipment?.equipmentModelId)
        const result = history?.map(entry => {
          const hourlyEarning = model?.hourlyEarnings.length === 1 
            ? model.hourlyEarnings[0] 
            : model?.hourlyEarnings.find(he => he.equipmentStateId === entry.equipmentStateId)
          return {
            ...entry,
            value: hourlyEarning ? hourlyEarning.value : null
          }
        })
        return result
      }
    },
  }
})
