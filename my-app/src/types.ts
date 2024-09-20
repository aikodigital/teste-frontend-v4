// src/types.ts

// Interface para Equipamento (Equipment)
export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
  model?: string; // Propriedade model opcional
  position?: {
    date: string;
    lat: number;
    lon: number;
    lng?: number; // Adicionado para lidar com a conversão
  }; // Propriedade de posição opcional
  state?: EquipmentState | null; // Propriedade de estado opcional
}

// Interface para Estado de Equipamento (EquipmentState)
export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

// Interface para Ganhos por Hora (HourlyEarnings)
export interface HourlyEarnings {
  equipmentStateId: string;
  value: number;
}

// Interface para Modelo de Equipamento (EquipmentModel)
export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
}

// Interface para Entrada de Estado de Equipamento (EquipmentStateEntry)
export interface EquipmentStateEntry {
  date: string; // ISO date string
  equipmentStateId: string;
}

// Interface para Histórico de Estado de Equipamento (EquipmentStateHistory)
export interface EquipmentStateHistory {
  equipmentId: string;
  states: EquipmentStateEntry[];
}

// Interface para Entrada de Posição de Equipamento (EquipmentPositionEntry)
export interface EquipmentPositionEntry {
  date: string; // ISO date string
  lat: number;
  lon: number;
}

// Interface para Histórico de Posição de Equipamento (EquipmentPositionHistory)
export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: EquipmentPositionEntry[];
}

// Interface para Histórico de Estados do Equipamento (StateHistory)
export interface StateHistory {
  date: string;
  state: string;
}

// Interface para Equipamento Selecionado (SelectedEquipment)
export interface SelectedEquipment {
  id: string;
  name: string;
  type: string;
  position: {
    lat: number;
    lon: number;
  };
}
