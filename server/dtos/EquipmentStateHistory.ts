type States = {
  date: string,
  equipmentStateId: string
}
export interface EquipmentStateHistory {
  equipmentId: string,
  states: Array<States>
}

export type EquipmentsStateHistory = Array<EquipmentStateHistory>