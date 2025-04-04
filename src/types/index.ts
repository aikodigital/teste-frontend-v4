export interface EquipmentStateType {
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

export interface Position {
  date: string;
  lat: number;
  lon: number;
}

export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}


export interface StateHistory {
  equipmentStateId: string; // Alterado de stateId para equipmentStateId
  date: string;
}

export interface EquipmentWithDetails extends Equipment {
  currentPosition: Position;
  currentState: EquipmentStateType;
  stateHistory: StateHistory[];
  model: EquipmentModel;
}