import { EquipmentModelJson } from "./EquipmentModel"
import { EquipmentStateHistoryItemJson } from "./EquipmentStateHistory"
import { EquipmentStateJson } from "./EquipmentState"
import { Position } from "./EquipmentPositionHistory"

export type EquipmentJson = {
  id: string,
  equipmentModelId: string,
  name: string
}

export type Equipment = EquipmentJson & {
  position?: Position,
  model?: EquipmentModelJson,
  state?: EquipmentStateHistoryItemJson & EquipmentStateJson
}