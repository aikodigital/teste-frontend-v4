export type Position = {
  date: string
  lat: number
  lon: number
}

export type State = {
  id: string
  name: string
  color: string
  icon: string
  date: Date
}

export interface IEquipmentsPosition {
  equipmentId: string
  position: Position
}

export interface IEquipmentsState {
  equipmentId: string
  state: State
}

export interface IEquipment {
  name: string
  model: string
  equipmentId: string
  state: State
  position: Position
  icon: string
  stateHistory: State[]
  positionHistory: Position[]
}
