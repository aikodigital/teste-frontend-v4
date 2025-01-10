import { equipment } from '@/data/equipment'
import { equipmentPositionHistory } from '@/data/equipmentPositionHistory'
import { equipmentStateHistory } from '@/data/equipmentStateHistory'
import { equipmentModel } from '@/data/equipmentModel'
import type {
  Equipment,
  EquipmentModel,
  EquipmentPositionHistory,
  EquipmentStateHistory,
} from '@/types'

export const getEquipments = async (): Promise<Equipment[]> => {
  // Simulate an API call with a delay
  const response = await new Promise<Equipment[]>((resolve) => {
    setTimeout(() => {
      resolve(equipment)
    }, 1000)
  })

  return response
}

export const getPositions = async (): Promise<EquipmentPositionHistory[]> => {
  // Simulates getting positions from a JSON file
  const response = await new Promise<EquipmentPositionHistory[]>((resolve) => {
    setTimeout(() => {
      resolve(equipmentPositionHistory)
    }, 1000)
  })

  return response
}

export const getStates = async (): Promise<EquipmentStateHistory[]> => {
  // Simulates getting states from a JSON file
  const response = await new Promise<EquipmentStateHistory[]>((resolve) => {
    setTimeout(() => {
      resolve(equipmentStateHistory)
    }, 1000)
  })

  return response
}

export const getModels = async (): Promise<EquipmentModel[]> => {
  // Simulates getting models from a JSON file
  const response = await new Promise<EquipmentModel[]>((resolve) => {
    setTimeout(() => {
      resolve(equipmentModel)
    }, 1000)
  })

  return response
}
