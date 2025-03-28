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
  
  export interface HourlyEarning {
    equipmentStateId: string;
    value: number;
  }
  
  export interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: HourlyEarning[];
  }
  
  export interface EquipmentStateHistoryEntry {
    date: string; // ISO Date String
    equipmentStateId: string;
  }
  
  export interface EquipmentStateHistory {
    equipmentId: string;
    states: EquipmentStateHistoryEntry[];
  }
  
  export interface PositionEntry {
    date: string; // ISO Date String
    lat: number;
    lon: number;
  }
  
  export interface EquipmentPositionHistory {
    equipmentId: string;
    positions: PositionEntry[];
  }
  
  // Tipos combinados para facilitar o uso
  export interface ProcessedEquipmentStateHistoryEntry extends EquipmentStateHistoryEntry {
      state?: EquipmentState; // Estado completo com nome e cor
  }
  
  export interface EquipmentData {
      equipment: Equipment;
      model: EquipmentModel;
      latestPosition?: PositionEntry;
      latestState?: ProcessedEquipmentStateHistoryEntry;
      stateHistory: ProcessedEquipmentStateHistoryEntry[];
      positionHistory: PositionEntry[];
  }