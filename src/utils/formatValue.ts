import states from '../../data/equipmentState.json'
import equipments from '../../data/equipment.json'
import statesHistory from '../../data/equipmentStateHistory.json'
import type { EquipmentStatus } from '~/models/Equipment'

export function formatDate(date: string) {
  const isValidDate = !Number.isNaN(Date.parse(date))
  if (!isValidDate) {
    return 'Invalid Date'
  }

  const formattedDate = new Date(date).toISOString().slice(0, 10).split('-').reverse().join('/')

  return formattedDate
}

export function returnEquipmentBasedOnId(equipmentId: string) {
  const equipment = equipments.find(equipment => equipment.id === equipmentId)

  return equipment ? equipment.name : 'Equipamento não identificado'
}

export function returnStateBasedOnId(id: string) {
  return states.filter(state => state.id === id)
}

export function returnEquipmentStateBasedOnDate(equipmentId: string, date: string): EquipmentStatus | undefined {
  const stateHistory = statesHistory.find(stateHistory => stateHistory.equipmentId === equipmentId)

  if (stateHistory) {
    const targetDate = new Date(date)

    const matchedState = stateHistory.states
      .map(state => ({
        ...state,
        date: new Date(state.date),
      }))
      .filter(state => state.date <= targetDate)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .shift()

    if (matchedState) {
      const equipmentState = returnStateBasedOnId(matchedState.equipmentStateId)
      return equipmentState[0]
    }
  }

  return undefined
}
