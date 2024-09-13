export interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
  description?: string; 
}

export interface Position {
  id: string;
  lat: number;
  lon: number;
  date: string;
}

export interface StateHistory {
  date: string;
  equipmentStateId: string;
}

export interface State {
  id: string;
  name: string;
  color: string;
  timestamp?: string;
  status?: string;    
}

export interface Model {
  id: string;
  name: string;
  hourlyEarnings: any[];
}

export interface EquipmentHistory {
  date: string;
  equipmentStateId: string;
  timestamp?: string; 
}
