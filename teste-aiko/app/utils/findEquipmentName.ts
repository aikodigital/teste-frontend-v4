import equipmentData from "../../../data/equipment.json";
import equipmentModel from "../../../data/equipmentModel.json";
import { Position } from "../../types";

export const findEquipmentName = (positionOrModelId: Position | string) => {
  let equipmentModelId: string | undefined;

  if (typeof positionOrModelId === 'string') {
    equipmentModelId = positionOrModelId;
  } else {
    equipmentModelId = equipmentData.find((e) => e.id === positionOrModelId.equipmentId)?.equipmentModelId;
  }

  return equipmentModel.find((e) => e.id === equipmentModelId)?.name ?? 'Modelo desconhecido';
}
