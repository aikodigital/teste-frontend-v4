import { IEquipamentView } from '@/interface/equipament';
import equipmentData from '../data/equipment.json';
import { getLastStateHistory, listStateHistoryState } from './equipmentStateHistory';

export function listEquipament() {
    return equipmentData;
}

export async function getEquipament(id: string) {
    let response: IEquipamentView = {} as IEquipamentView;
    
    await Promise.all(equipmentData.map(async (equipment) => {
        if (equipment.id == id) {
            const stateHistory = await listStateHistoryState(equipment.id)
            const lastState = await getLastStateHistory(equipment.id)
            response = {
                id: equipment.id,
                name: equipment.name,
                equipmentModelId: equipment.equipmentModelId,
                stateHistory: stateHistory,
                lastState: lastState
            }
        }
    }))

    return response;
}