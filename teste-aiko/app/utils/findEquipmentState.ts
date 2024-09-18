import equipmentState from "../../../data/equipmentState.json";
import equipmentStateHistory from "../../../data/equipmentStateHistory.json";
import { Position } from "../../types";

export const findEquipmentState = (
  positionOrEquipmentId: Position | string
) => {  
  let equipmentId: string | undefined;

  if (typeof positionOrEquipmentId === "string") {
    equipmentId = positionOrEquipmentId;
  } else {
    equipmentId = equipmentStateHistory.find(e => e.equipmentId === positionOrEquipmentId.equipmentId)?.states[0]?.equipmentStateId
  }
  return equipmentState.find((e) => e.id === equipmentId)?.name ?? "Parado";
};
