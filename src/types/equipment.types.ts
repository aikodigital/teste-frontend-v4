export interface IEquipment {
  id: string
  equipmentModelId: string
  name: string
}

export interface IEquipmentPosition {
  date: string
  lat: number
  lon: number
}

export interface IEquipmentPositionHistory {
  equipmentId: string
  positions: IEquipmentPosition[]
}

export interface IHourlyEarning {
  equipmentStateId: string
  value: number
}

export interface IEquipmentModel {
  id: string
  name: string
  hourlyEarnings: IHourlyEarning[]
}

export interface IEquipmentStateDefinition {
  id: string
  name: string
  color: string
}

export interface IEquipmentStates {
  date: string
  equipmentStateId: string
}

export interface IEquipmentStateHistory {
  equipmentId: string
  states: IEquipmentStates[]
}

export interface IEquipmentSummary {
  equipmentId: string | null
  equipmentName: string | null
  modelName: string | null
  lastStateName: string | null
  lastStateColor: string | null
  lastStateDate: string | null
  lastPosition: {
    lat: number
    lon: number
  } | null
  lastPositionDate: string | null
  recentStates: {
    name: string | null
    color: string | null
    date: string | null
  }[]
}