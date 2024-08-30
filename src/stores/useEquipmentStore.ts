import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Position {
  lat: number
  lon: number
}

interface Equipment {
  id: string
  name?: string
}

interface EquipmentState {
  id: string
  name: string
  color: string
}

interface EquipmentStateHistory {
  equipmentId: string
  states: {
    equipmentStateId: string
    date: string
  }[]
}

interface EquipmentPositionHistory {
  equipmentId: string
  positions: Position[]
}

export const useEquipmentStore = defineStore('equipment', () => {
  const equipmentData = ref<Equipment[]>([])
  const equipmentStates = ref<EquipmentState[]>([])
  const equipmentStateHistory = ref<EquipmentStateHistory[]>([])
  const equipmentPositionHistory = ref<EquipmentPositionHistory[]>([])

  // Funções para buscar dados
  const fetchEquipmentData = async () => {
    try {
      const response = await fetch('/data/equipment.json')
      equipmentData.value = await response.json()
    } catch (error) {
      console.error('Error fetching equipment data:', error)
    }
  }

  const fetchEquipmentStates = async () => {
    try {
      const response = await fetch('/data/equipmentState.json')
      equipmentStates.value = await response.json()
    } catch (error) {
      console.error('Error fetching equipment states:', error)
    }
  }

  const fetchEquipmentStateHistory = async () => {
    try {
      const response = await fetch('/data/equipmentStateHistory.json')
      equipmentStateHistory.value = await response.json()
    } catch (error) {
      console.error('Error fetching equipment state history:', error)
    }
  }

  const fetchEquipmentPositionHistory = async () => {
    try {
      const response = await fetch('/data/equipmentPositionHistory.json')
      equipmentPositionHistory.value = await response.json()
    } catch (error) {
      console.error('Error fetching equipment position history:', error)
    }
  }

  // Getters para acessar dados combinados
  const getLatestEquipmentStateById = (equipmentId: string) => {
    const history = equipmentStateHistory.value.find(
      (history) => history.equipmentId === equipmentId
    )
    if (history && history.states.length > 0) {
      const latestStateId = history.states[history.states.length - 1].equipmentStateId
      const latestState = equipmentStates.value.find((state) => state.id === latestStateId) || null

      // Pega a data do estado mais recente
      const latestDate = history.states[history.states.length - 1].date

      return {
        date: latestDate,
        ...latestState
      }
    }
    return null
  }

  const getEquipmentStateHistoryById = (equipmentId: string) => {
    const history = equipmentStateHistory.value.find(
      (history) => history.equipmentId === equipmentId
    )
    return history ? history.states : []
  }

  const getLatestPositionById = (equipmentId: string) => {
    const positionHistory = equipmentPositionHistory.value.find(
      (history) => history.equipmentId === equipmentId
    )
    if (positionHistory && positionHistory.positions.length > 0) {
      return positionHistory.positions[positionHistory.positions.length - 1] || null
    }
    return null
  }

  const getEquipmentDetails = (equipmentId: string) => {
    const equipment = equipmentData.value.find((e) => e.id === equipmentId)
    if (!equipment) return null

    const stateHistory = equipmentStateHistory.value.find((h) => h.equipmentId === equipmentId)
    const latestStateId = stateHistory?.states[stateHistory.states.length - 1]?.equipmentStateId
    const currentState = equipmentStates.value.find((s) => s.id === latestStateId)

    const positionHistory = equipmentPositionHistory.value.find(
      (p) => p.equipmentId === equipmentId
    )
    const latestPosition = positionHistory?.positions[positionHistory.positions.length - 1]

    // Mapeamento do histórico de estados para incluir o nome do estado
    const stateHistoryWithDetails =
      stateHistory?.states.map((state) => {
        const stateDetails = equipmentStates.value.find((s) => s.id === state.equipmentStateId)
        return {
          date: state.date,
          stateName: stateDetails?.name || 'Estado Desconhecido',
          stateColor: stateDetails?.color || 'grey'
        }
      }) || []

    return {
      ...equipment,
      currentState,
      latestPosition,
      stateHistory: stateHistoryWithDetails
    }
  }

  return {
    equipmentData,
    equipmentStates,
    equipmentStateHistory,
    equipmentPositionHistory,
    fetchEquipmentData,
    fetchEquipmentStates,
    fetchEquipmentStateHistory,
    fetchEquipmentPositionHistory,
    getEquipmentStateHistoryById,
    getLatestEquipmentStateById,
    getLatestPositionById,
    getEquipmentDetails
  }
})
