import { IPositionHistoryPosition } from '@/interface/positionHistory';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';


export async function listPositionHistory(equipmentId: string) {
    let response: IPositionHistoryPosition[] = [];
    
    await Promise.all(equipmentPositionHistory.map(history => {
        if (history.equipmentId == equipmentId) {
            response = history.positions
        }
    }))

    return response;
}

export async function getLastPositionHistory(equipmentId: string) {
    let response: IPositionHistoryPosition = {} as IPositionHistoryPosition;
    const positionHistory = await listPositionHistory(equipmentId);

    await Promise.all(positionHistory.map((history, i, row) => {
        if (i + 1 === row.length) {
            response = history
        }
    }))

    return response;
}