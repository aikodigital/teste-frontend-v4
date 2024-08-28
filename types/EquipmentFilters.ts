import type Equipment from "./Equipment"
import type EquipmentModel from "./EquipmentModel"
import type EquipmentState from "./EquipmentState"

export default interface EquipmentFilters {
  equipment: string
  model: string
  state: string
}
