export interface IHourlyEarnings {
  maintenance: number
  operating: number
  stopped: number
}

export type IEquipmentStateData = {
  date: string
  equipmentStateId: string
}

export interface IEquipmentStateHistoryData {
  equipmentId: string
  states: IEquipmentStateData[]
}

export interface IPositionData {
  date: string
  lat: number
  lon: number
}

export interface IEquipmentPositionHistoryData {
  equipmentId: string
  positions: IPositionData[]
}

export interface ITotalHoursPerState {
  totalMaintenance: number
  totalOperating: number
  totalStopped: number
}

export interface IHoursPerState {
  maintenance: number
  operating: number
  stopped: number
}

export interface IEquipment {
  id: string
  equipmentModelId: string
  name: string
  model: string
  hourlyEarnings: IHourlyEarnings
  stateHistory: IEquipmentStateData[]
  positionHistory: IPositionData[]
  lastStateHistory: IEquipmentStateData
  lastPositionHistory: IPositionData
  totalHoursPerState?: ITotalHoursPerState
  lastDayUpdateOperatingHours?: number
}
