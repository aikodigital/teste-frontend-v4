import { EquipmentStateJson } from "./EquipmentState"

export type EquipmentStateHistoryJson = {
  equipmentId: string,
  states: Array<EquipmentStateHistoryItemJson>
}

export type EquipmentStateHistoryItemJson = {
  date: string,
  equipmentStateId: string
}

export type EquipmentStateHistoryItem = EquipmentStateHistoryItemJson & EquipmentStateJson 
