export interface EquipmentStateHistory {
  equipmentId: string;
  states: Array<{ equipmentStateId: string; date: string }>;
}

export interface StateHistory {
  equipmentId: string;
  timestamp?: string;
  states: { equipmentStateId: string; date: string }[]; // array de estados com a data
}
