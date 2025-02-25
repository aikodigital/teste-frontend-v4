type HourlyEarning = {
  equipmentStateId: string,
  value: number
}

export interface EquipmentModel {
  id: string,
  name: string,
  hourlyEarnings: Array<HourlyEarning>
}

export type EquipmentsModel = Array<EquipmentModel>