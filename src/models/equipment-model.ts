import { HourlyEarning } from './horly-earning';
import { Default } from './default';

export class EquipmentModel extends Default {
  name: string;
  hourlyEarnings: HourlyEarning[];
}
