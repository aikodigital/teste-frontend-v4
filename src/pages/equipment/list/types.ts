export interface IEquipmentData {
  id: string
  equipmentModelId: string
  name: string
}

export interface IEquipmentModelData {
  id: string
  name: string
  hourlyEarnings: IHourlyEarnings[]
}

export interface IHourlyEarnings {
  equipmentStateId: string
  value: number
}
