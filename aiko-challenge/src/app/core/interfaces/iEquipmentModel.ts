import { IHourlyEarning } from './iHourlyEarning';

export interface IEquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: IHourlyEarning[];
}
