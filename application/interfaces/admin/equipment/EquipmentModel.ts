import type HourlyEarning from "./HourlyEarning";

export default interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
}