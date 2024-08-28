import type Equipment from "./Equipment"
import type EquipmentModel from "./EquipmentModel"
import type EquipmentState from "./EquipmentState"

export default interface EquipmentData {
  equipments: Equipment[]
  models: EquipmentModel[]
  states: EquipmentState[]
}
