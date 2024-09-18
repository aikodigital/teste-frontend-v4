interface HourlyEarningsProps{
  equipmentStateId: string
  value: number
}

export interface EquipmentModelProps{
  id: string
  name: string
  hourlyEarnings: HourlyEarningsProps[]
}

