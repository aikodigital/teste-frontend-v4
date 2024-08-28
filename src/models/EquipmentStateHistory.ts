export interface EquipmentStateHistory {
  equipmentId: string;
  states: Array<{
    date: string;
    equipmentStateId: string;
  }>;
}
