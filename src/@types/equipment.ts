export enum EquipmentState {
  OPERATING = 'Operando',
  MAINTENANCE = 'Manutenção',
  STOPPED = 'Parado',
}

export interface IEquipment {
  id: string;
  name: string;
  equipmentModel?: IEquipmentModel;
}

export interface IEquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: Array<{
    equipmentState?: IEquipmentState;
    value: number;
  }>;
}

export interface IEquipmentState {
  id: string;
  name: EquipmentState;
  color: string;
}

export interface IEquipmentPositionHistory {
  equipmentId: string;
  positions: Array<{
    date: string;
    lat: number;
    lon: number;
  }>;
}

export interface IEquipmentStateHistory {
  equipmentId: string;
  states: Array<{
    date: string;
    equipmentState?: IEquipmentState;
  }>;
}
