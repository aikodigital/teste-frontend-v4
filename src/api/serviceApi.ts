import { EquipmentStateHistoryProps } from '../models/Equipment'
import Api from './Api'

async function getEquipmentPositionHistory() {
  const response = await Api.get('equipmentPositionHistory.json')
  return response.data
}

async function getEquipment() {
  const equipments = (await Api.get('equipment.json')).data
  return equipments
}

getEquipment()

async function getEquipmentModel() {
  const response = await Api.get('equipmentModel.json')
  return response.data
}

async function getEquipmentState() {
  const response = await Api.get('equipmentState.json')
  return response.data
}

async function getAllEquipmentStateHistory() {
  const response = await Api.get('equipmentStateHistory.json')
  return response.data
}

async function getEquipmentStateHistory(id: string) {
  const response = await getAllEquipmentStateHistory()

  return response.filter(
    (item: EquipmentStateHistoryProps) => item.equipmentId === id
  )
}

export {
  getAllEquipmentStateHistory,
  getEquipment,
  getEquipmentModel,
  getEquipmentPositionHistory,
  getEquipmentState,
  getEquipmentStateHistory
}
