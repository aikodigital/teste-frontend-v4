import { defineStore } from 'pinia'
import { ref } from 'vue'
import equipmentData from '@/mockDB/equipment.json'
import equipmentModel from '@/mockDB/equipmentModel.json'
import equipmentPositionHistory from '@/mockDB/equipmentPositionHistory.json'
import equipmentStateHistory from '@/mockDB/equipmentStateHistory.json'
import equipmentState from '@/mockDB/equipmentState.json'
import {
  type IEquipmentModel,
  type IEquipmentPositionHistory,
  type IEquipment,
  type IEquipmentStateDefinition,
  type IEquipmentStateHistory,
} from '@/types'


export const useEquipmentStore = defineStore('equipment', () => {

  const equipments = ref<IEquipment[]>([])
  const equipmentsPositionHistory = ref<IEquipmentPositionHistory[]>([])
  const equipmentsModels = ref<IEquipmentModel[]>([])
  const equipmentStates = ref<IEquipmentStateDefinition[]>([])
  const equipmentsStateHistory = ref<IEquipmentStateHistory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function getEquipments() {
    try {
      loading.value = true
      error.value = null

      await new Promise(resolve => setTimeout(resolve, 500))

      equipments.value = equipmentData
    } catch (err) {
      error.value = `Failed to fetch equipments: ${err}`
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }

  async function getEquipmentsPositionHistory() {
    try {
      error.value = null
      equipmentsPositionHistory.value = equipmentPositionHistory
    } catch (err) {
      error.value = `Failed to fetch equipments position history: ${err}`
      console.error(error.value)
    }
  }

  async function getEquipmentModels() {
    try {
      error.value = null
      equipmentsModels.value = equipmentModel
    } catch (err) {
      error.value = `Failed to fetch equipments model: ${err}`
      console.error(error.value)
    }
  }

  async function getEquipmentStates() {
    try {
      error.value = null

      equipmentStates.value = equipmentState
    } catch (err) {
      error.value = `Failed to fetch equipment states: ${err}`
      console.error(error.value)
    }
  }

  async function getEquipmentsStateHistory() {
    try {
      error.value = null
      equipmentsStateHistory.value = equipmentStateHistory
    } catch (err) {
      error.value = `Failed to fetch equipments state History: ${err}`
      console.error(error.value)
    }
  }

  return {
    equipments,
    equipmentsPositionHistory,
    equipmentsModels,
    equipmentStates,
    equipmentsStateHistory,
    loading,
    error,
    getEquipments,
    getEquipmentsPositionHistory,
    getEquipmentModels,
    getEquipmentStates,
    getEquipmentsStateHistory,
  }
})