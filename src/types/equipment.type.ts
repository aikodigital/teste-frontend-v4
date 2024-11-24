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
  states: Array<{
    date: string;
    equipmentStateId: string;
  }>;
}

export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Array<{
    date: string;
    lat: number;
    lon: number;
  }>;
}

export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: Array<{
    equipmentStateId: string;
    value: number;
  }>;
}
