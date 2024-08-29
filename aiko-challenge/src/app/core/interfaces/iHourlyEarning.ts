import { IEquipmentState } from './iEquipmentState';
export interface IHourlyEarning {
  equipmentStateId: string;
  value: number;
  status?: IEquipmentState;
}
