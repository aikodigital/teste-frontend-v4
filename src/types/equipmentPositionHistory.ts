import type { Equipment } from './equipment'
import type { Positions } from './positions'

export type EquipmentPositionHistory = {
  equipmentId: Equipment['id']
  positions: Positions[]
}
