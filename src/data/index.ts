import equipmentData from './equipment.json';
import equipmentModelData from './equipmentModel.json';
import equipmentPositionHistoryData from './equipmentPositionHistory.json';
import equipmentStateData from './equipmentState.json';
import equipmentStateHistoryData from './equipmentStateHistory.json';


import { Equipment, EquipmentModel, EquipmentPositionHistory, EquipmentState, EquipmentStateHistory } from "../types";

export const equipment: Equipment[] = equipmentData;
export const equipmentModel: EquipmentModel[] = equipmentModelData;
export const equipmentPositionHistory: EquipmentPositionHistory[] = equipmentPositionHistoryData;
export const equipmentState: EquipmentState[] = equipmentStateData;
export const equipmentStateHistory: EquipmentStateHistory[] = equipmentStateHistoryData;

