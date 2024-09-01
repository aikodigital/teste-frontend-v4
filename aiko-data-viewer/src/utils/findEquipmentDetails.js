import equipment from '../data/equipment.json'
import equipmentModel from '../data/equipmentModel.json'
import equipmentStateHistory from '../data/equipmentStateHistory.json'

export function findEquipment(equipmentId) {
  return equipment.find(({ id }) => id === equipmentId)
}

export function findEquipmentModel(equipmentId) {
  const selectedEquipment = findEquipment(equipmentId)
  return equipmentModel.find(({ id }) => id === selectedEquipment.equipmentModelId)
}

export function getEquipmentStateHistory(id) {
  return equipmentStateHistory.find((s) => s.equipmentId === id)
}

export function getEquipmentEarnings(modelId) {
  return equipmentModel.find((model) => model.id === modelId)?.hourlyEarnings
}
