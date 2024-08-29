export interface EquipmentStateHistoryEntry {
  date: string;
  equipmentStateId: string;
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: EquipmentStateHistoryEntry[];
}
