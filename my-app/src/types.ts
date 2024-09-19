// src/types.ts

// Interface para Equipment (Equipamento)
export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

// Interface para EquipmentModel (Modelo de Equipamento)
export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
}

// Interface para HourlyEarnings (Ganhos por Hora)
export interface HourlyEarnings {
  equipmentStateId: string;
  value: number;
}

// Interface para EquipmentState (Estado do Equipamento)
export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

// Interface para Entry de EquipmentState (Entrada de Estado de Equipamento)
export interface EquipmentStateEntry {
  date: string; // ISO date string
  equipmentStateId: string;
}

// Interface para EquipmentStateHistory (Histórico de Estado de Equipamento)
export interface EquipmentStateHistory {
  equipmentId: string;
  states: EquipmentStateEntry[];
}

// Interface para Entry de EquipmentPosition (Entrada de Posição de Equipamento)
export interface EquipmentPositionEntry {
  date: string; // ISO date string
  lat: number;
  lon: number;
}

// Interface para EquipmentPositionHistory (Histórico de Posições de Equipamento)
export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: EquipmentPositionEntry[];
}

// Adicione outros tipos que você estiver usando, conforme necessário.
