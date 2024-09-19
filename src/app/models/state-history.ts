export interface EquipmentStateHistory {
  equipmentId: string;
  states: Array<{ equipmentStateId: string; date: string }>;
}

export interface StateHistory {
  equipmentId: string;
  states: Array<{ equipmentStateId: string; date: string }>;
}
