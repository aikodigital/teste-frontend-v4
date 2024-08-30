export interface IEquipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

export interface IHourlyEarnings {
  equipmentStateId: string;
  value: number;
}

export interface IEquipmentsModel {
  id: string;
  name: string;
  hourlyEarnings: IHourlyEarnings[];
}

export interface IPositions {
  date: string;
  lat: number;
  lon: number;
}

export interface IEquipmentsPositionHistory {
  equipmentId: string;
  positions: IPositions[];
}

export interface IEquipmentState {
  id: string;
  name: string;
  color: string;
}

export interface IStates {
  date: string;
  equipmentStateId: string;
}

export interface IEquipmentStateHistory {
  equipmentId: string;
  states: IStates[];
}
