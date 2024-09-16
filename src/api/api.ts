import equipmentData from '../data/equipment.json';
import equipmentModel from '../data/equipmentModel.json';
import equipmentPositions from '../data/equipmentPositionHistory.json';
import equipmentStatesInfo from '../data/equipmentState.json';
import equipmentStates from '../data/equipmentStateHistory.json';
import { Equipment, EquipmentModel, EquipmentPosition, EquipmentStateInfo, EquipmentStateHistory } from '../types';

// Simulação de chamadas da API
export const fetchEquipmentList = () => {
    return new Promise<Equipment[]>((resolve) => {
        setTimeout(() => {
            resolve(equipmentData as Equipment[]);
        }, 300);
    });
};

export const fetchEquipmentModelList = () => {
    return new Promise<EquipmentModel[]>((resolve) => {
        setTimeout(() => {
            resolve(equipmentModel as EquipmentModel[]);
        }, 300);
    });
};

export const fetchEquipmentPositions = () => {
    return new Promise<EquipmentPosition[]>((resolve) => {
        setTimeout(() => {
            resolve(equipmentPositions as EquipmentPosition[]);
        }, 300);
    });
};

export const fetchEquipmentStatesInfo = () => {
    return new Promise<EquipmentStateInfo[]>((resolve) => {
        setTimeout(() => {
            resolve(equipmentStatesInfo as EquipmentStateInfo[]);
        }, 300);
    });
};

export const fetchEquipmentStatesHistory = () => {
    return new Promise<EquipmentStateHistory[]>((resolve) => {
        setTimeout(() => {
            resolve(equipmentStates as EquipmentStateHistory[]);
        }, 300);
    });
};