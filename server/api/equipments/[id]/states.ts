import equipmentJson from '~/data/equipment.json'
import equipmentStateHistoryJson from '~/data/equipmentStateHistory.json'
import equipmentStateJson from '~/data/equipmentState.json'
import EquipmentState from '~/types/EquipmentState'
import EquipmentStateDate from '~/types/EquipmentStateDate'

export default defineEventHandler<EquipmentStateDate[]>((event) => {
  const equipmentId = getRouterParam(event, 'id')

  const unformattedEquipment = equipmentJson.find(equipment => equipment.id === equipmentId)
  if (!unformattedEquipment) return []

  const unformattedEquipmentStateHistory = equipmentStateHistoryJson.find(history => history.equipmentId === equipmentId)
  if (!unformattedEquipmentStateHistory) return []

  const equipmentStates: EquipmentState[] = equipmentStateJson.map(state => ({
    id: state.id,
    name: state.name,
    color: state.color
  }))

  const equipmentPositions: EquipmentStateDate[] = unformattedEquipmentStateHistory.states.map(stateDate => ({
    date: new Date(stateDate.date),
    state: equipmentStates.find(state => state.id === stateDate.equipmentStateId)
  }))

  return equipmentPositions
})
