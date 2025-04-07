export interface equipament {
  id: string,
  equipmentModelId: string,
  name: string
}

export interface hourlyEarnings {
  equipmentStateId: string,
  value: number
}

export interface equipmentModel {
  id: string,
  name: string,
  hourlyEarnings: hourlyEarnings[]
}
export interface positions {
  date: Date,
  lat: number,
  lon: number
}
export interface equipamentPositionHistory {
  equipmentId: string,
  positions: positions[]
}
export interface equipamentState {
  id:string,
  name: string,
  color: string
}
export interface state {
  equipmentStateId:string,
  date: Date,
}
export interface equipamentStateHistory {
  equipamentId: string,
  equipamentState: equipamentState[]
}
export interface EquipmentFullData {
  id: string
  name: string
  equipmentModelId: string
  modelId: string
  modelName: string
  hourlyEarnings: number
  stateName: string
  stateColor: string
  lastPosition: {
    lat: number
    lon: number
    date: Date
  } | null
  stateHistory: equipamentStateHistory
}


  