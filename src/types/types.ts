// src/types.ts

export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: { equipmentStateId: string; value: number }[];
}

export interface EquipmentPosition {
  equipmentId: string;
  positions: { date: string; lat: number; lon: number }[];
}

export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: { equipmentStateId: string; date: string }[];
}
