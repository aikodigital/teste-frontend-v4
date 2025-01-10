import type { HourlyEarnings } from './hourlyEarnings'

export type EquipmentModel = {
  id: string
  name: string
  hourlyEarnings: HourlyEarnings[]
}
