import type { EquipmentState } from './equipmentState'

export type HourlyEarnings = {
  equipmentStateId: EquipmentState['id']
  value: number
}
