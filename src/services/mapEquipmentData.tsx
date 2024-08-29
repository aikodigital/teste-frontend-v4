import equipmentData from '../data/equipment.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import { EquipmentState, EquipmentStateHistory } from './interfaces/equipamentInterfaces';
import { formatDate } from '../utils/utils';


const equipmentStateHistory = equipmentStateHistoryData as EquipmentStateHistory[];
const equipmentStates = equipmentStateData as EquipmentState[];


const getLatestPosition = (positions: any[]) => {
    return positions.reduce((latest, current) => {
        return new Date(latest.date) > new Date(current.date) ? latest : current;
    });
};

const getLatestState = (equipmentId: string) => {
    const equipmentStateHistory = equipmentStateHistoryData.find(
        (history) => history.equipmentId === equipmentId
    );

    if (!equipmentStateHistory) return null;

    const latestState = equipmentStateHistory.states.reduce((latest, current) => {
        return new Date(latest.date) > new Date(current.date) ? latest : current;
    });

    return equipmentStateData.find((state) => state.id === latestState.equipmentStateId);
};

const getHistory = (equipmentId: string) => {
    const history = equipmentStateHistory.find(h => h.equipmentId === equipmentId)?.states || [];
    return history.slice(-5).map(state => ({
        date: formatDate(state.date),
        state: getStateById(state.equipmentStateId),
    }));
};


const getStateById = (id: string) => {
    return equipmentStates.find(state => state.id === id)?.name || 'Desconhecido';
};


export const mapEquipmentData = () => {
    return equipmentData.map((equipment) => {
        const positionHistory = equipmentPositionHistoryData.find(
            (history) => history.equipmentId === equipment.id
        );

        if (!positionHistory) return null;

        const latestPosition = getLatestPosition(positionHistory.positions);
        const latestState = getLatestState(equipment.id);

        return {
            id: equipment.id,
            name: equipment.name,
            lat: latestPosition.lat,
            lon: latestPosition.lon,
            state: latestState ? latestState.name : 'Unknown',
            color: latestState ? latestState.color : '#000000',
            stateHistory: getHistory(equipment.id),
        };
    }).filter(Boolean);
};
