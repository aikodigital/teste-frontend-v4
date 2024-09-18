export interface Equipament {
  id: string;
  equipmentIdModelId: string;
}

export interface EquipamentState {
  id: string;
  name: string;
  color: string;
}
export interface EquipamentModel {
  id: string;
  name: string;
  hours: {
    equipamentStateId: string;
    value: number;
  }[];
}

export interface EquipamenteStateHistory {
  equipmentId: string;
  state: {
    date: string;
    equipamentStateId: string;
  };
}

export interface EquipamentPositionHistory {
  equipmentId: string;
  positions: {
    date: string;
    lat: number;
    lon: number;
  }[];
}

export interface Position {
  date: string;
  lat: number;
  lon: number;
}
