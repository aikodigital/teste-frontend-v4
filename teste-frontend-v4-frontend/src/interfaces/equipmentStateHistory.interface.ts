export type TState = {
  date: string
  equipmentStateId: string
}

export interface IEquipmentStateHistory {
  equipmentId: string
  states: TState[]
}
