export interface IHourlyEarnings {
  equipmentStateId: string;
  value: number;
}

export interface IEquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: IHourlyEarnings[];
}
