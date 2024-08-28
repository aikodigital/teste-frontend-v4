export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: Array<{
    equipmentStateId: string;
    value: number;
  }>;
}
