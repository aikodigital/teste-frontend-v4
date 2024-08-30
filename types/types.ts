export interface IEquipment {
  id: string
  equipmentModelId: string
  name: string
}

interface IEquipmentModelHourlyEarnings {
  equipmentStateId: string
  value: number
}

export interface IEquipmentModel {
  id: string
  name: string
  hourlyEarnings: Array<IEquipmentModelHourlyEarnings>
}

export type IEquipmentModelData = Pick<IEquipmentModel, 'id' | 'name'>

export interface IEquipmentPositionHistory {
  equipmentId: string
  positions: Array<IEquipmentPosition>
}

export interface IEquipmentPosition {
  date: string
  lat: number
  lon: number
}

export interface IState {
  id: string
  name: string
  color: string
}

export interface IEquipmentState {
  date: string
  equipmentStateId: string
}

export interface IEquipmentStateHistory {
  equipmentId: string
  states: Array<IEquipmentState>
}

export interface Equipment {
  id: string
  name: string
  model: string
  modelId: string
  positionHistory: Array<IEquipmentPosition>
  stateHistory: Array<IEquipmentState>
  lastState: IEquipmentState
  lastPosition: IEquipmentPosition

}

export interface UseEquipmentsOptions {
  state: string
  equipmentName: string
  equipmentId: string
}

export interface EquipmentsContextProvider {
  equipments: Ref<Equipment[]>
  loading: Ref<boolean>
}
