import { defineStore } from 'pinia'
import equipmentData from '@/data/equipment.json'
import equipmentModelData from '@/data/equipmentModel.json'
import equipmentPositionHistoryData from '@/data/equipmentPositionHistory.json'
import equipmentStateData from '@/data/equipmentState.json'
import equipmentStateHistoryData from '@/data/equipmentStateHistory.json'

export const useMainStore = defineStore('main', {
  state: () => ({
    equipments: [],
    equipmentModels: [],
    equipmentPositions: [],
    equipmentStates: [],
    equipmentStateHistories: [],
  }),
  actions: {
    loadData() {
      this.equipments = equipmentData
      this.equipmentModels = equipmentModelData
      this.equipmentPositions = equipmentPositionHistoryData
      this.equipmentStates = equipmentStateData
      this.equipmentStateHistories = equipmentStateHistoryData
    },

    getEquipmentState(equipmentId) {
      const stateHistory = this.equipmentStateHistories.find(
        (history) => history.equipmentId === equipmentId
      )
      if (stateHistory) {
        const lastStateId = stateHistory.states[stateHistory.states.length - 1].equipmentStateId
        return this.equipmentStates.find((state) => state.id === lastStateId)
      }
      return null
    },

    getEquipmentStateDetails(stateId) {
      const foundState = this.equipmentStates.find((state) => state.id === stateId)
      if (foundState) {
        return foundState
      }
      return null
    },

    getEquipmentPositionHistory(equipmentId) {
      const positionHistory = this.equipmentPositions.find(
        (history) => history.equipmentId === equipmentId
      )
      if (positionHistory) {
        return positionHistory.positions
      }
      return []
    },

    getEquipmentPosition(equipmentId) {
      const positionHistory = this.equipmentPositions.find(
        (history) => history.equipmentId === equipmentId
      )
      if (positionHistory) {
        return positionHistory.positions[positionHistory.positions.length - 1]
      }
      return null
    },

    getEquipmentModel(equipmentModelId) {
      return this.equipmentModels.find((model) => model.id === equipmentModelId)
    },

    getEquipmentDetails(equipmentId) {
      const equipment = this.equipments.find((eq) => eq.id === equipmentId)
      if (!equipment) return null

      const state = this.getEquipmentState(equipmentId)
      const position = this.getEquipmentPosition(equipmentId)
      const model = this.getEquipmentModel(equipment.equipmentModelId)

      return {
        ...equipment,
        state,
        position,
        model,
      }
    },

    getEquipmentHistory(equipmentId) {
      const stateHistory = this.equipmentStateHistories.find(
        (history) => history.equipmentId === equipmentId
      )
      if (stateHistory) {
        return stateHistory.states
      }
      return []
    },

    getEquipmentProductivity(equipmentId) {
      const stateHistory = this.equipmentStateHistories.find(
        (history) => history.equipmentId === equipmentId
      )
    
      if (!stateHistory) {
        return 0
      }
    
      let operatingTime = 0
      let totalTime = 0
    
      stateHistory.states.forEach((state, index) => {
        if (index === stateHistory.states.length - 1) return
    
        const currentState = this.equipmentStates.find(s => s.id === state.equipmentStateId)
        const nextState = stateHistory.states[index + 1]
    
        const startTime = new Date(state.date)
        const endTime = new Date(nextState.date)
    
        const durationInHours = (endTime - startTime) / (1000 * 60 * 60)
    
        totalTime += durationInHours
    
        if (currentState?.name === "Operando") {
          operatingTime += durationInHours
        }
      })
    

      const percentageProductivity = (operatingTime / totalTime) * 100
      return Math.round(percentageProductivity)
    },

    getEquipmentEarnings(equipmentId) {
      const stateHistory = this.equipmentStateHistories.find(
        (history) => history.equipmentId === equipmentId
      )
    
      if (!stateHistory) {
        return 0
      }
    
      let totalEarnings = 0
      const equipment = this.equipments.find(eq => eq.id === equipmentId)

      if(!equipment) {
        return totalEarnings
      }
      
      const model = this.equipmentModels.find(m => m.id === equipment.equipmentModelId)
    
    
      stateHistory.states.forEach((state, index) => {
        if (index === stateHistory.states.length - 1) return
    
        const currentState = this.equipmentStates.find(s => s.id === state.equipmentStateId)
        const nextState = stateHistory.states[index + 1]
    
        const startTime = new Date(state.date)
        const endTime = new Date(nextState.date)
    
        const durationInHours = (endTime - startTime) / (1000 * 60 * 60)
    
        const hourlyRate = model.hourlyEarnings.find(e => e.equipmentStateId === currentState.id)?.value || 0
    
        totalEarnings += durationInHours * hourlyRate
      })
    
      return Math.round(totalEarnings)
    }
  },
})
