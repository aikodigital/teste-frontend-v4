export interface Position {
  lat: number;
  lon: number;
  date: string;
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

export interface StateHistory {
  equipmentId: string;
  equipmentStateId: string;
  date: string;
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: StateHistory[];
}

export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
  }[];
}
export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}
