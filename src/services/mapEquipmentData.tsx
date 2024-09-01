import equipmentData from '../data/equipment.json';
import equipmentModel from '../data/equipmentModel.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import { EquipmentState, EquipmentStateHistory } from './interfaces/equipmentInterfaces';
import { calculateTotalEarnings, formatDate } from '../utils/utils';

import truckIcon from '../assets/caminhao.png';
import clawIcon from '../assets/garra.png';
import harvesterIcon from '../assets/harvester.png';
import aikoIcon from '../assets/aiko.png';

const equipmentStateHistory = equipmentStateHistoryData as EquipmentStateHistory[];
const equipmentStates = equipmentStateData as EquipmentState[];

const getLatestPosition = (positions: {date: string, lat: number, lon:number }[]) => {
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

const calculateProductivity = (equipmentId: string) => {
    const history = equipmentStateHistory.find(h => h.equipmentId === equipmentId)?.states || [];
    
    const sortedHistory = history
        .map(state => ({
            date: new Date(state.date),
            stateId: state.equipmentStateId
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());


    const totalHours = getTotalHours(sortedHistory);

    const productiveHours = getProductiveHours(sortedHistory);

    const productivity = totalHours > 0 ? (productiveHours / totalHours) * 100 : 0;
    return `${productivity.toFixed(2)}%`;
};


const getTotalHours = (sortedHistory: { date: Date, stateId: string }[] ): number => {
    return sortedHistory
        .reduce((acc, curr, index, array) => {
            if (index === 0) return acc;
            const prevDate = array[index - 1].date;
            const currDate = curr.date;
            const hours = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60);
            return acc + hours;
        }, 0);
}

const getProductiveHours = (sortedHistory: { date: Date, stateId: string }[]): number => {
    return sortedHistory
        .reduce((acc, curr, index, array) => {
            if (index === 0) return acc;
            const prevDate = array[index - 1].date;
            const currDate = curr.date;
            const hours = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60);

            const isProductive = getStateById(curr.stateId) === 'Operando';
            return acc + (isProductive ? hours : 0);
        }, 0);
}

const getIcon = (name: string | undefined) => {
    switch (name) {
        case 'Caminhão de carga':
            return truckIcon
        case 'Harvester':
            return harvesterIcon
        case 'Garra traçadora':
            return clawIcon;
        default:
            return aikoIcon;
    }
}


export const mapEquipmentData = () => {
    return equipmentData.map((equipment) => {
        const positionHistory = equipmentPositionHistoryData.find(
            (history) => history.equipmentId === equipment.id
        );

        const model = equipmentModel.find((e) => e.id === equipment.equipmentModelId);

        if (!positionHistory) {
            throw new Error(`Equipamento não encontrado para o ID: ${equipment.id}`);
        };

        const latestPosition = getLatestPosition(positionHistory?.positions);
        const latestState = getLatestState(equipment.id);

        return {
            id: equipment.id,
            tag: equipment.name,
            productivity: calculateProductivity(equipment.id),
            earnings: calculateTotalEarnings(equipment.equipmentModelId, equipment.id),
            icon: getIcon(model?.name),
            name: model?.name,
            lat: latestPosition?.lat,
            lon: latestPosition?.lon,
            state: latestState ? latestState.name : 'Unknown',
            color: latestState ? latestState.color : '#000000',
            stateHistory: getHistory(equipment.id),
        };
    }).filter(Boolean);
};
