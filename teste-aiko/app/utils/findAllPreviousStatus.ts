import equipmentState from "../../../data/equipmentState.json";
import equipmentStateHistory from "../../../data/equipmentStateHistory.json";
import { Position } from "../../types";

export const findEquipmentState = (position: Position): string => {
  const equipmentId = equipmentStateHistory.find((e) => e.equipmentId === position.equipmentId)?.states[0]?.equipmentStateId;
  return equipmentState.find((e) => e.id === equipmentId)?.name ?? "Parado";
};