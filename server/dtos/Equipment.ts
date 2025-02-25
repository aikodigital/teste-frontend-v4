import type { EquipmentModel } from "./EquipmentModel"
import type { Position } from "./EquipmentPositionHistory"
import type { EquipmentState } from "./EquipmentState"

export interface Equipment {
  id: string,
  equipmentModelId: string,
  name: string
}

export type Equipments = Array<Equipment>

export type EquipmentResponse = {
  equipmentModelId: string,
  id: string,
  name: string,
  icon?: string,
  model?: EquipmentModel,
  position?: Position,
  state?: EquipmentState
}