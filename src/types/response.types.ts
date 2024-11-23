export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
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

export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: EquipmentStateH[];
}

interface EquipmentStateH {
  date: string;
  equipmentStateId: string;
}

export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}

interface Position {
  date: string;
  lat: number;
  lon: number;
}
