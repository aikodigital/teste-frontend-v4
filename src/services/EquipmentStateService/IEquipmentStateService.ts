export interface IEquipmentStateService {
  fetchAllEquipmentState(): Promise<IEquipmentState[]>;
  fetchEquipmentState(
    equipmentId: string
  ): Promise<IEquipmentStateHistory | null>;
}

export interface IEquipmentState {
  equipmentId: string;
  state: IState | null;
}

export interface IEquipmentStateHistory {
  equipmentId: string;
  states: IState[];
}

export interface IState {
  date: string;
  equipmentStateId: string;
}
