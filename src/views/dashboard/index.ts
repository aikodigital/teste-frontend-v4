export interface TableData {
  name: string
  model: string
  gain: number
  productivity: string
}

export interface Position {
  date: string
  lat: number
  lon: number
}

export interface EquipmentStateHistory {
  date: string
  state: string
}

export interface Equipments {
  id: string
  equipmentModelId: string
  name: string
}

export interface EquipmentsStatesPositions {
  date: string
  equipmentStateId: string
}

export interface EquipmentsPositions {
  equipmentId: string
  states: EquipmentsStatesPositions[]
  positions: Position[]
}

export interface Model {
  id: string
  name: string
  hourlyEarnings: HourlyEarningModel[]
}

export interface HourlyEarningModel {
  equipmentStateId: string
  value: number
}

export interface States {
  id: string
  name: string
  color: string
}

export interface HoursCount {
  [stateId: string]: number
}
