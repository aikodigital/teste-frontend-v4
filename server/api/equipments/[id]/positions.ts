import equipmentJson from '~/data/equipment.json'
import equipmentPositionHistoryJson from '~/data/equipmentPositionHistory.json'
import EquipmentPosition from '~/types/EquipmentPosition'

export default defineEventHandler<EquipmentPosition[]>((event) => {
  const equipmentId = getRouterParam(event, 'id')

  const unformattedEquipment = equipmentJson.find(equipment => equipment.id === equipmentId)
  if (!unformattedEquipment) return []

  const unformattedEquipmentPositionHistory = equipmentPositionHistoryJson.find(history => history.equipmentId === equipmentId)
  if (!unformattedEquipmentPositionHistory) return []

  const equipmentPositions: EquipmentPosition[] = unformattedEquipmentPositionHistory.positions.map(position => ({
    date: new Date(position.date),
    lat: position.lat,
    lon: position.lon
  }))

  return equipmentPositions
})
