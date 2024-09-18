import { HourlyEarnings } from './hourlyEarnings.model';

export interface EquipamentModel  {
    id: string,
    name: string,
    hourlyEarnings: Array<HourlyEarnings>


}