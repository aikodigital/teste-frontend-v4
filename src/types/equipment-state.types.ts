export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

export enum StateType {
  OPERATING = 'operando',
  MAINTENANCE = 'manutenção',
  STOPPED = 'parado',
}
