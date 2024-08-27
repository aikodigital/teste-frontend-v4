export type THourlyEarning = {
  equipmentStateId: string
  value: number
}

export interface IEquipmentModel {
  id: string
  name: string
  hourlyEarnings: THourlyEarning[]
}
