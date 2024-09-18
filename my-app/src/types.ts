// src/types.ts
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
  
  export interface HourlyEarnings {
    equipmentStateId: string;
    value: number;
  }
  
  export interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: HourlyEarnings[];
  }
  
  export interface EquipmentStateEntry {
    date: string; // ISO date string
    equipmentStateId: string;
  }
  
  export interface EquipmentStateHistory {
    equipmentId: string;
    states: EquipmentStateEntry[];
  }
  
  export interface EquipmentPositionEntry {
    date: string; // ISO date string
    lat: number;
    lon: number;
  }
  
  export interface EquipmentPositionHistory {
    equipmentId: string;
    positions: EquipmentPositionEntry[];
  }