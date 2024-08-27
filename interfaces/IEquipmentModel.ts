export interface IEquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
  }[];
}
