import equipmentStates from '../data/equipmentState.json';
import equipment from '../data/equipment.json';
import equipmentModels from '../data/equipmentModel.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';

export const getStates = async (): Promise<string[]> => {
    return equipmentStates.map((state: { name: string }) => state.name);
}

export const getModels = async (): Promise<string[]> => {
    return equipmentModels.map((model: { name: string }) => model.name);
}

export const getEquipment = async (): Promise<string[]> => {
    return equipment.map((model: { name: string }) => model.name);
}

export const getEquipmentTrajectory = async (equipmentName: string): Promise<any[]> => {
    const equipmentItem = equipment.find((equip: { name: string }) => equip.name === equipmentName);
    if (!equipmentItem) return [];

    const equipmentId = equipmentItem.id;

    const trajectory = equipmentPositionHistory.find((data: { equipmentId: string; }) => data.equipmentId === equipmentId);

    return trajectory ? trajectory.positions : [];
}