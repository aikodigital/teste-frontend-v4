export interface IPosition {
  date: string;
  lat: number;
  lon: number;
}


export interface IEquipmentPositionHistory {
  equipmentId: string;
  positions: IPosition[];
}

export interface IEquipmentState {
  id: string;
  name: string;
  color: string;
}

export interface IHourlyEarning {
  equipmentStateId: string;
  value: number;
}

export interface IEquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: IHourlyEarning[];
}


export interface IEquipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

export interface IEquipmentStateEntry {
  date: string;
  equipmentStateId: string;
}

export interface IEquipmentStateHistory {
  equipmentId: string;
  states: IEquipmentStateEntry[];
}
