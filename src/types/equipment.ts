export interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

export interface Position {
  date: string;
  lat: number;
  lon: number;
}

export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}

export interface EquipmentStateRecord {
  date: string;
  equipmentStateId: string;
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: EquipmentStateRecord[];
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

export interface EnrichedEquipmentState {
  date: string;
  equipmentStateId: string;
  lat: number;
  lon: number;
  name: string;
  color: string;
}

export interface EquipmentDetail {
  id: string;
  name: string;
  model: EquipmentModel;
  positions: Position[];
  currentPosition: Position;
  currentState: EquipmentState;
  stateHistory: EnrichedEquipmentState[];
  productivity: number;
  earnings: number;
}

export enum EquipmentStateEnum {
  FUNCIONANDO = 'Operando',
  MANUTENCAO = 'Manutenção',
  INATIVO = 'Parado',
}

export enum EquipmentModelEnum {
  CAMINHAO_CARGA = 'Caminhão de carga',
  GARRA_TRACADORA = 'Garra traçadora',
  HARVESTER = 'Harvester',  
}