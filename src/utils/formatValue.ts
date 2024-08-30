import states from '../../data/equipmentState.json'
import equipments from '../../data/equipment.json'
import equipmentModels from '../../data/equipmentModel.json'
import statesHistory from '../../data/equipmentStateHistory.json'
import type { EquipmentStatus } from '~/models/Equipment'

export function formatCurrency(value: number, currency = 'BRL') {
  if (!value) {
    return
  }

  return value.toLocaleString('pt-BR', { style: 'currency', currency })
}

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

function hoursDifference(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
}

export function calculateProductivityForEquipment(equipmentId: string) {
  const equipmentHistory = statesHistory.find(e => e.equipmentId === equipmentId)

  if (!equipmentHistory) {
    return null
  }

  let totalHours = 0
  let productiveHours = 0
  const equipmentStates = equipmentHistory.states

  for (let i = 1; i < equipmentStates.length; i++) {
    const prevState = equipmentStates[i - 1]
    const currentState = equipmentStates[i]

    const duration = hoursDifference(prevState.date, currentState.date)

    if (prevState.equipmentStateId === '0808344c-454b-4c36-89e8-d7687e692d57') {
      productiveHours += duration
    }

    totalHours += duration
  }

  const productivityPercentage = totalHours > 0 ? (productiveHours / totalHours) * 100 : 0

  return Number.parseFloat(productivityPercentage.toFixed(2))
}

function getEquipmentByModelId(equipmentModelId: string) {
  const equipment = equipments.find(equipment => equipment.id === equipmentModelId)
  const model = equipmentModels.find(model => model.id === equipment?.equipmentModelId)

  return model
}

export function calculateEquipmentGain(equipmentId: string) {
  const equipmentHistory = statesHistory.find(e => e.equipmentId === equipmentId)

  if (!equipmentHistory) {
    return null
  }

  const equipmentModel = getEquipmentByModelId(equipmentId)

  if (!equipmentModel) {
    return null
  }

  const hourlyEarnings = equipmentModel.hourlyEarnings.reduce((acc, { equipmentStateId, value }) => {
    acc[equipmentStateId] = value
    return acc
  }, {} as { [stateId: string]: number })

  let totalGain = 0
  const equipmentStates = equipmentHistory.states

  for (let i = 1; i < equipmentStates.length; i++) {
    const prevState = equipmentStates[i - 1]
    const currentState = equipmentStates[i]

    const duration = hoursDifference(prevState.date, currentState.date)
    const rate = hourlyEarnings[prevState.equipmentStateId] || 0

    totalGain += duration * rate
  }

  return formatCurrency(Number.parseFloat(totalGain.toFixed(2)))
}
