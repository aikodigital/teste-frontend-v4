import type { Equipment } from './equipment'
import type { States } from './states'

export type EquipmentStateHistory = {
  equipmentId: Equipment['id']
  states: States[]
}
