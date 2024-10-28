import { LatLngExpression } from 'leaflet'
import { equipment } from '@/data/equipment'
import { equipmentState } from '@/data/equipmentState'
import { equipmentStateHistory } from '@/data/equipmentStateHistory'
import { equipmentPositionsHistory } from '@/data/equipmentPositionHistory'
import { equipmentModel } from '@/data/equipmentModel'

export function getEquipmentLatestPosition(
  positions: { date: string; lat: number; lon: number }[],
): LatLngExpression {
  const latestPosition = positions[positions.length - 1]
  return [latestPosition.lat, latestPosition.lon] as LatLngExpression
}

export function getEquipmentName(id: string): string {
  const equipmentData = equipment.find((eq) => eq.id === id)
  return equipmentData?.name ?? 'Nome não encontrado'
}

export function getEquipmentModel(equipmentId: string): string {
  const equipmentData = equipment.find((eq) => eq.id === equipmentId)
  if (!equipmentData) return 'Equipamento não encontrado'

  const equipmentModelData = equipmentModel.find(
    (model) => model.id === equipmentData.equipmentModelId,
  )

  return equipmentModelData?.name ?? 'Modelo não encontrado'
}

export function getProductionModelByDay(
  equipmentId: string,
  date: string,
): string {
  const stateHistory = equipmentStateHistory.find(
    (history) => history.equipmentId === equipmentId,
  )
  if (!stateHistory) return 'Histórico de estado não encontrado'

  const operatingState = equipmentState.find(
    (state) => state.name === 'Operando',
  )
  if (!operatingState) return 'Estado "Operando" não encontrado'

  const totalHoursInDay = 24
  let hoursOperating = 0

  const statesForTheDay = stateHistory.states.filter((state) => {
    const stateDate = new Date(state.date)
    const targetDate = new Date(date)
    return stateDate.toDateString() === targetDate.toDateString()
  })

  statesForTheDay.forEach((state, index) => {
    if (state.equipmentStateId === operatingState.id) {
      const startTime = new Date(state.date).getTime()

      let endTime: number
      if (index + 1 < statesForTheDay.length) {
        endTime = new Date(statesForTheDay[index + 1].date).getTime()
      } else {
        const endOfDay = new Date(state.date)
        endOfDay.setHours(24, 0, 0, 0)
        endTime = endOfDay.getTime()
      }

      const durationInHours = (endTime - startTime) / (1000 * 60 * 60)
      hoursOperating += durationInHours
    }
  })

  const productivityPercentage = (hoursOperating / totalHoursInDay) * 100

  return `${productivityPercentage.toFixed(2)}%`
}

export function getcalculateEquipmentEarningsByDay(
  equipmentId: string,
  date: string,
): string {
  const stateHistory = equipmentStateHistory.find(
    (history) => history.equipmentId === equipmentId,
  )
  if (!stateHistory) return 'Histórico de estado não encontrado'

  const equipmentData = equipment.find((eq) => eq.id === equipmentId)
  if (!equipmentData) return 'Equipamento não encontrado'

  const model = equipmentModel.find(
    (model) => model.id === equipmentData.equipmentModelId,
  )
  if (!model) return 'Modelo de equipamento não encontrado'

  const getHourlyEarnings = (stateId: string) => {
    const earningsData = model.hourlyEarnings.find(
      (earning) => earning.equipmentStateId === stateId,
    )
    return earningsData?.value ?? 0
  }

  let totalEarnings = 0

  const statesForTheDay = stateHistory.states.filter((state) => {
    const stateDate = new Date(state.date)
    const targetDate = new Date(date)
    return stateDate.toDateString() === targetDate.toDateString()
  })

  statesForTheDay.forEach((state, index) => {
    const startTime = new Date(state.date).getTime()
    let endTime: number

    if (index + 1 < statesForTheDay.length) {
      endTime = new Date(statesForTheDay[index + 1].date).getTime()
    } else {
      const endOfDay = new Date(state.date)
      endOfDay.setHours(24, 0, 0, 0)
      endTime = endOfDay.getTime()
    }

    const durationInHours = (endTime - startTime) / (1000 * 60 * 60)

    const hourlyRate = getHourlyEarnings(state.equipmentStateId)
    totalEarnings += durationInHours * hourlyRate
  })

  return `Ganhos do dia: R$ ${totalEarnings.toFixed(2)}`
}

export function getEquipmentLatestState(equipmentId: string) {
  const stateHistory = equipmentStateHistory.find(
    (history) => history.equipmentId === equipmentId,
  )
  if (!stateHistory) return null

  const latestStateId =
    stateHistory.states[stateHistory.states.length - 1]?.equipmentStateId
  return equipmentState.find((state) => state.id === latestStateId)
}

export function getEquipmentPositionHistory(id: string) {
  const equipmentPositionHistory = equipmentPositionsHistory.find(
    (equipment) => equipment.equipmentId === id,
  )
  if (!equipmentPositionHistory) return []

  return [...equipmentPositionHistory.positions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
}
