export interface EquipmentStateHistory {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateID: string;
  }[];
}
