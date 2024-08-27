export interface IEquipmentStateHistory {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}
