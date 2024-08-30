import equipment from '../data/equipment.json'
import equipmentModel from '../data/equipmentModel.json'

export function findEquipment(equipmentId) {
  return equipment.find(({ id }) => id === equipmentId)
}

export function findEquipmentModel(equipmentId) {
  const selectedEquipment = findEquipment(equipmentId)
  return equipmentModel.find(({ id }) => id === selectedEquipment.equipmentModelId)
}
