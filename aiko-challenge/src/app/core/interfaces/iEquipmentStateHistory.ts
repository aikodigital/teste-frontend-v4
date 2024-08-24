import { IState } from './iState';

export interface IEquipmentStateHistory {
  equipmentId: string;
  states: IState[];
}
