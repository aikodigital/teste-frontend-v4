import equipmentData from "../../../data/equipment.json";
import { Position } from "../../types";

export const findEquipmentSerialNumber = (position: Position) => {
  return equipmentData.find((e) => e.id === position.equipmentId)?.name
}