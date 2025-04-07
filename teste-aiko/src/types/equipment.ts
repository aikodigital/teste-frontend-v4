export type EquipmentInfo = {
  id: string
  equipmentModelId: string
  name: string
}

export type HourlyEarning = {
  equipmentStateId: string
  value: number
}

export type EquipmentModel = {
  id: string
  name: string
  hourlyEarnings: HourlyEarning[]
}

export type EquipmentPosition = {
  lat: number
  lon: number
  date: string
}

export type EquipmentTrack = {
  equipmentId: string
  positions: EquipmentPosition[]
}

export type EquipmentState = {
  date: string
  equipmentStateId: string
}

export type EquipmentStateHistory = {
  equipmentId: string
  states: EquipmentState[]
}

export type StateDefinition = {
  id: string
  name: string
  color: string
}

export type StateLegend = Record<string, StateDefinition>

