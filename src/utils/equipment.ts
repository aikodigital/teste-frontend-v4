import { EquipmentStateEnum } from '@/enums/EquipmentStateEnum'
import Dinero from 'dinero.js'

const createEquipmentModel = (equipmentModelData: EquipmentModel[], equipmentModelId: string): EquipmentModel => {
  const modelData = equipmentModelData.find((m) => m.id == equipmentModelId) as EquipmentModel

  return modelData
}

const createEquipmentPositionHistory = (
  equipmentPositionHistoryData: EquipmentPositionHistoryData[],
  equipmentId: string
): EquipmentPosition[] => {
  const positionHistoryData = equipmentPositionHistoryData.find(
    (p) => p.equipmentId == equipmentId
  ) as EquipmentPositionHistoryData

  positionHistoryData.positions.sort(function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return positionHistoryData.positions
}

const createEquipmentStateHistory = (
  equipmentStateHistoryData: EquipmentStateHistoryData[],
  equipmentStateData: EquipmentStateData[],
  equipmentId: string
) => {
  const stateHistoryData = equipmentStateHistoryData.find(
    (p) => p.equipmentId == equipmentId
  ) as EquipmentStateHistoryData

  stateHistoryData.states.sort(function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const states: EquipmentState[] = []

  for (let i = 0; i < stateHistoryData.states.length; i++) {
    const currentState = stateHistoryData.states[i]

    const stateData = equipmentStateData.find((s) => s.id == currentState.equipmentStateId) as EquipmentStateData

    states.push({
      id: stateData.id,
      name: stateData.name,
      color: stateData.color,
      date: currentState.date
    })
  }

  return states
}

const createEquipments = (
  equipmentsData: EquipmentData[],
  equipmentModelData: EquipmentModel[],
  equipmentPositionHistoryData: EquipmentPositionHistoryData[],
  equipmentStateHistoryData: EquipmentStateHistoryData[],
  equipmentStateData: EquipmentStateData[]
) => {
  const equipments: Equipment[] = []

  for (let i = 0; i < equipmentsData.length; i++) {
    const currentEquipment = equipmentsData[i]

    equipments.push({
      id: currentEquipment.id,
      name: currentEquipment.name,
      model: createEquipmentModel(equipmentModelData, currentEquipment.equipmentModelId),
      positionHistory: createEquipmentPositionHistory(equipmentPositionHistoryData, currentEquipment.id),
      stateHistory: createEquipmentStateHistory(equipmentStateHistoryData, equipmentStateData, currentEquipment.id)
    })
  }

  return equipments
}

const filterEquipments = (equipmentList: Equipment[], equipmentFilter: EquipmentFilter): Equipment[] => {
  const filteredEquipments: Equipment[] = []

  for (let i = 0; i < equipmentList.length; i++) {
    const currentEquipment = equipmentList[i]

    let addEquipment = true

    if (
      equipmentFilter.models.length > 0 &&
      !equipmentFilter.models.find((m) => m.active && m.id == currentEquipment.model.id)
    ) {
      addEquipment = false
    }

    if (addEquipment) {
      filteredEquipments.push(currentEquipment)
    }
  }

  return filteredEquipments
}

const calculateDetails = (equipment: Equipment): EquipmentDetails => {
  const hourlyEarningsOperating = equipment.model.hourlyEarnings.find(
    (h) => h.equipmentStateId == EquipmentStateEnum.OPERATING
  )!.value
  const hourlyEarningsMaintenance = equipment.model.hourlyEarnings.find(
    (h) => h.equipmentStateId == EquipmentStateEnum.MAINTENANCE
  )!.value

  let operatingValue = 0
  let maintenanceValue = 0

  let totalHours = 0
  let operatingHours = 0

  for (let index = equipment.stateHistory.length - 1; index >= 0; index--) {
    const state: EquipmentState = equipment.stateHistory[index]

    const currentDate = new Date(state.date)
    let nextDate

    if (index == 0) {
      nextDate = new Date(state.date)
      nextDate.setDate(nextDate.getDate() + 1)
      nextDate.setHours(0)
      nextDate.setMinutes(0)
      nextDate.setSeconds(0)
    } else {
      nextDate = new Date(equipment.stateHistory[index - 1].date)
    }

    const timeDiff = nextDate.getTime() - currentDate.getTime()
    const hoursDiff = timeDiff / 1000 / 60 / 60

    totalHours += hoursDiff

    if (state.id == EquipmentStateEnum.MAINTENANCE) {
      maintenanceValue += hoursDiff * hourlyEarningsMaintenance
    }

    if (state.id == EquipmentStateEnum.OPERATING) {
      operatingValue += hoursDiff * hourlyEarningsOperating
      operatingHours += hoursDiff
    }
  }

  const gainsValue = operatingValue - maintenanceValue

  return {
    gains: Dinero({
      amount: parseInt(`${gainsValue}00`),
      precision: 2,
      currency: 'BRL'
    }).toFormat('$0,0.00'),
    productivity: parseFloat(((operatingHours / totalHours) * 100).toFixed(2))
  }
}

export { createEquipments, filterEquipments, calculateDetails }
