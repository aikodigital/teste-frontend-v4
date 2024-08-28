import type EquipmentState from "./EquipmentState";

export default interface EquipmentStateDate {
  equipmentId: string
  date: string
  state?: EquipmentState
}
