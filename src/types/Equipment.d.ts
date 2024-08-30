interface EquipmentFilter {
  models: EquipmentModelFilter[]
}

interface EquipmentModelFilter {
  id: string
  name: string
  active: boolean
}

interface EquipmentData {
  id: string
  name: string
  equipmentModelId: string
}

interface EquipmentPositionHistoryData {
  equipmentId: string
  positions: EquipmentPosition[]
}

interface EquipmentStateHistory {
  id: string
  name: string
  color: string
}

interface EquipmentStateHistoryData {
  equipmentId: string
  states: EquipmentStateHistoryStateData[]
}

interface EquipmentStateHistoryStateData {
  date: string
  equipmentStateId: string
}

interface EquipmentStateData {
  id: string
  name: string
  color: string
}

interface Equipment {
  id: string
  name: string
  model: EquipmentModel
  positionHistory: EquipmentPosition[]
  stateHistory: EquipmentState[]
}

interface EquipmentPosition {
  date: string
  lon: number
  lat: number
}

interface EquipmentState {
  id?: string
  name: string
  color: string
  date: string
}

interface EquipmentDailyProductivity {
  date: string
  productivity: string
}

interface EquipmentModel {
  id: string
  name: string
  img: string
  hourlyEarnings: EquipmentHourlyEarnings[]
}

interface EquipmentHourlyEarnings {
  equipmentStateId: string
  value: number
}

interface EquipmentDetails {
  gains: string
  productivity: number
}

interface EquipmentHistoryState {
  status: string
  date: string
  color: string
}
