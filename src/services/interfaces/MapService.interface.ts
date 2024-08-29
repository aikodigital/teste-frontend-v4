export interface Position {
  date: string; 
  lat: number;
  lon: number;
}

export interface EquipmentPosition {
  equipmentId: string;
  positions: Position[];
}

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

export interface EquipmentStateHistory {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}

export interface EquipmentData {
  equipmentId: string;
  name: string;
  positions: Position[];
  states: { date: string; stateName: string; color: string }[];
  model: EquipmentModel;
}

export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
}

export interface HourlyEarning {
  equipmentStateId: string;
  value: number;
}
