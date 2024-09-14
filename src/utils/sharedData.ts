import equipmentData from '../data/equipment.json';
import equipmentModel from '../data/equipmentModel.json';
import equipmentPositions from '../data/equipmentPositionHistory.json';
import equipmentStatesInfo from '../data/equipmentState.json';
import equipmentStates from '../data/equipmentStateHistory.json';

import { Equipment, EquipmentModel, EquipmentStateInfo, EquipmentStateHistory } from '../types';
import { getLatestState, getStateNameById, getStateColorById } from './getStateInfo';

// Exportando os dados
export const equipmentList: Equipment[] = equipmentData;
export const equipmentModelList: EquipmentModel[] = equipmentModel;
export const equipmentPositionsList = equipmentPositions;
export const equipmentStatesInfoList: EquipmentStateInfo[] = equipmentStatesInfo;
export const equipmentStatesHistory: EquipmentStateHistory[] = equipmentStates;

// Exportando funções auxiliares (caso necessário)
export { getLatestState, getStateNameById, getStateColorById };