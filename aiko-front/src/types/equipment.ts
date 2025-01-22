export interface Positions {
  date: string
  lat: number
  lon: number
}

export interface EquipmentPositionHistory {
  equipmentId: string
  positions: Positions[]
}

export interface Equipment {
  id: string,
  equipmentModelId: string,
  name: string
}

export interface HourlyEarnings {
  equipmentStateId: string
  value: number
}

export interface EquipmentModel {
  id: string,
  name: string
  hourlyEarnings: HourlyEarnings[]
}

export interface EquipmentState {
  id: string,
  name: string,
  color: string
}

export interface StateHistory {
  date: Date | string,
  equipmentStateId: string
}

export interface EquipmentStateHistory {
  equipmentId: string
  states: StateHistory[]
}
