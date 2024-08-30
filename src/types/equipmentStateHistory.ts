export interface IEquipmentStateHistory {
  equipmentId: string;
  states: State[];
}
export interface State {
  date: string;
  equipmentStateId: string;
}

export interface IHistoryStateItem {
  date: string;
  stateName: string;
  stateColor: string;
}

export interface IHistoryStateResponse {
  equipment: {
    name: string;
    modelName: string;
  };
  items: IHistoryStateItem[];
  total: number;
}
