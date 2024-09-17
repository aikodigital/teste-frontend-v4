export interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

export interface Position {
  lon: number;
  lat: number;
  date: string;
}

export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}

export interface StateHistory {
  date: string;
  equipmentStateId: string;
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: StateHistory[];
}
