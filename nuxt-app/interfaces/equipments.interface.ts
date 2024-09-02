export interface IStates {
  id: string;
  name: string;
  color: string;
}

export interface IEquipmentNormalized {
  id: string;
  equipmentModelId: string;
  name: string;
  color: string;
  model: IEquipmentModel;
  mostRecentlyPosition: IPositions;
  mostRecentlyState: IStatesHistory;
  positionHistory: IEquipmentPositionHistory;
  stateHistory: IEquipmentStateHistory;
}

export interface IEquipmentPositionHistory {
  equipmentId: string;
  positions: IPositions[];
}

export interface IEquipmentStateHistory {
  equipmentId: string;
  states: IStatesHistory[];
}

export interface IEquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: IHourEarnings[];
}

export interface IHourEarnings {
  equipmentStateId: string;
  value: number;
}

export interface IPositions {
  date: string;
  lat: number;
  lon: number;
}

export interface IStatesHistory {
  date: string;
  equipmentStateId: string;
  stateReference?: IStates;
}
