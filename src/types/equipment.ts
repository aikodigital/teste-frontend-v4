export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

export interface HourlyEarning {
  equipmentStateId: string;
  value: number;
}

export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
}

export interface StateHistory {
  date: string;
  equipmentStateId: string;
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: StateHistory[];
}

export interface Position {
  date: string;
  lat: number;
  lon: number;
}

export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}