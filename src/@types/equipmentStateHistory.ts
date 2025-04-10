export type EquipmentState = {
  date: string
  equipmentStateId: string
}

export type EquipmentStateHistory = {
  equipmentId: string
  states: EquipmentState[]
}
