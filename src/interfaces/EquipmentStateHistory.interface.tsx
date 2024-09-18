interface ItemState {
  date: string;
  equipmentStateId: string;
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: ItemState[];
}
