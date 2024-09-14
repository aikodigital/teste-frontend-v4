import { Equipment, EquipmentStateHistory, EquipmentStateInfo, Position } from "../types";

export const getStateInfoById = (stateId: string, stateInfoList: EquipmentStateInfo[]): { name: string, color: string } => {
    const stateInfo = stateInfoList.find((state) => state.id === stateId);
    return stateInfo ? { name: stateInfo.name, color: stateInfo.color } : { name: "Desconhecido", color: "#000" };
};

export const getLatestPosition = (positions: Position[]): Position => {
    return positions.reduce((latest, current) =>
        new Date(current.date) > new Date(latest.date) ? current : latest
    );
};

export const getLatestState = (states: EquipmentStateHistory['states']): EquipmentStateHistory['states'][0] | null => {
    return states.reduce((latest, current) =>
        new Date(current.date) > new Date(latest.date) ? current : latest
    );
};

export const getStateNameById = (stateId: string, stateInfoList: EquipmentStateInfo[]): string => {
    const stateInfo = stateInfoList.find((state) => state.id === stateId);
    return stateInfo ? stateInfo.name : 'Desconhecido';
};

export const getStateColorById = (stateId: string, stateInfoList: EquipmentStateInfo[]): string => {
    const stateInfo = stateInfoList.find((state) => state.id === stateId);
    return stateInfo ? stateInfo.color : 'gray';
};

export const getEquipmentNameById = (equipmentId: string, equipmentList: Equipment[]): string => {
    const equipment = equipmentList.find(equip => equip.id === equipmentId);
    return equipment ? equipment.name : 'Equipamento Desconhecido';
};