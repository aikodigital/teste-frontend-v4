import {
  Equipment,
  EquipmentModel,
  EquipmentState,
  EquipmentStateHistory,
  EquipmentPositionHistory,
} from "../types";

import equipmentData from "../../data/equipment.json";
import equipmentModelData from "../../data/equipmentModel.json";
import equipmentStateData from "../../data/equipmentState.json";
import equipmentStateHistoryData from "../../data/equipmentStateHistory.json";
import equipmentPositionHistoryData from "../../data/equipmentPositionHistory.json";

export const equipments: Equipment[] = equipmentData;
export const equipmentModels: EquipmentModel[] = equipmentModelData;
export const equipmentStates: EquipmentState[] = equipmentStateData;
export const equipmentStateHistories: EquipmentStateHistory[] =
  equipmentStateHistoryData;
export const equipmentPositionHistories: EquipmentPositionHistory[] =
  equipmentPositionHistoryData;
