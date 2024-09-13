// Equipment interface with description added
export interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
  description?: string; 
}

// Position interface
export interface Position {
  id: string;
  lat: number;
  lon: number;
  date: string;
}

// StateHistory interface
export interface StateHistory {
  date: string;
  equipmentStateId: string;
}

// State interface with additional properties
export interface State {
  id: string;
  name: string;
  color: string;
  timestamp?: string;  // Adicionando 'timestamp' ao tipo State
  status?: string;     // Adicionando 'status' ao tipo State
}

// Model interface
export interface Model {
  id: string;
  name: string;
  hourlyEarnings: any[]; // Melhor especificar o tipo, caso conheça (ex: number[] para um array de números)
}

// EquipmentHistory interface
export interface EquipmentHistory {
  date: string;
  equipmentStateId: string;
  timestamp?: string;  // Adicionando 'timestamp' ao histórico, se necessário
}
