import type { HourlyEarning } from "./HourlyEarning";

export type EquipementModel = {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
}