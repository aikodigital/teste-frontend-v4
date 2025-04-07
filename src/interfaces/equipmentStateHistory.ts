export interface IStates {
  date: string;
  equipmentStateId: string;
}

export interface IEquipmentStateHistory {
  equipmentId: string;
  states: IStates[];
}
