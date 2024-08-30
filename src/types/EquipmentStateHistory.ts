export interface EquipmentStateHistory {
  equipmentId: string;
  states: {
    date: Date;
    equipmentStateId: string;
  }[];
}
