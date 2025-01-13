import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getEquipments, getModels, getPositions, getStates } from '@/services/equipmentService'
import type {
  Equipment,
  EquipmentModel,
  EquipmentPositionHistory,
  EquipmentStateHistory,
} from '@/types'

export const useEquipmentsStore = defineStore('equipments', () => {
  const equipments = ref<Equipment[]>([])
  const positions = ref<EquipmentPositionHistory[]>([])
  const states = ref<EquipmentStateHistory[]>([])
  const models = ref<EquipmentModel[]>([])

  const fetchEquipments = async () => {
    try {
      const data = await getEquipments()
      equipments.value = data
    } catch (error) {
      console.error('Error fetching equipments:', error)
    }
  }

  const fetchPositions = async () => {
    try {
      const data = await getPositions()
      positions.value = data
    } catch (error) {
      console.error('Error fetching positions:', error)
    }
  }

  const fetchStates = async () => {
    try {
      const data = await getStates()
      states.value = data
    } catch (error) {
      console.error('Error fetching states:', error)
    }
  }

  const fetchModels = async () => {
    try {
      const data = await getModels()
      models.value = data
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  }

  return {
    equipments,
    fetchEquipments,
    positions,
    fetchPositions,
    states,
    fetchStates,
    models,
    fetchModels,
  }
})
