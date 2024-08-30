export interface IEquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
}
interface HourlyEarning {
  equipmentStateId: string;
  value: number;
}