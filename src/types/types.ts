// Equipamento
export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

// Modelos de Equipamento
export interface HourlyEarnings {
  equipmentStateId: string;
  value: number;
}

export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
}

// Posições dos Equipamentos
export interface Position {
  date: string;
  lat: number;
  lon: number;
}

export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}

// Estados dos Equipamentos
export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

// Histórico de Estados
export interface EquipmentStateHistory {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}

// Tipo para dados organizados
export interface OrganizedEquipment {
  id: string;
  name: string;
  modelName: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
    stateName?: string;
  }[];
  positions: Position[];
  states: {
    date: string;
    equipmentStateId: string;
    stateName?: string;
  }[];
}

export interface FilteredEquipment {
  id: string;
  name: string;
  modelName: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
    stateName?: string;
  }[];
  positions: Position[];
  states: {
    date: string;
    equipmentStateId: string;
    stateName?: string;
  }[];
}
