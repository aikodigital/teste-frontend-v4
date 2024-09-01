import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentModels from '../data/equipmentModel.json';
import { EquipmentState, Position } from '../interfaces/interfaces';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentStateData from '../data/equipmentState.json';


import truckIcon from '../assets/caminhao.png';
import clawIcon from '../assets/garra.png';
import harvesterIcon from '../assets/harvester.png';
import aikoIcon from '../assets/aiko.png';

export const formatDate = (isoDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Sao_Paulo',
    };
    return new Date(isoDate).toLocaleDateString('pt-BR', options);
};

export const calculateTotalEarnings = (modelEquipmentId: string,  equipmentId: string): number => {
    const history = equipmentStateHistory.find(h => h.equipmentId === equipmentId)?.states || [];
    
    const model = equipmentModels.find(m => m.id === modelEquipmentId);
    
    if (!model) {
        throw new Error(`Modelo de equipamento não encontrado para o ID: ${modelEquipmentId}`);
    }

    const earningsMap = model.hourlyEarnings.reduce((map, e) => {
        map[e.equipmentStateId] = e.value;
        return map;
    }, {} as Record<string, number>);

    const stateDurations = history.reduce((acc, entry, index) => {
        if (index === 0) return acc;

        const prevEntry = history[index - 1];
        const currentDate = new Date(entry.date);
        const prevDate = new Date(prevEntry.date);
        const durationHours = (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60);

        const stateId = entry.equipmentStateId;
        acc[stateId] = (acc[stateId] || 0) + durationHours;

        return acc;
    }, {} as Record<string, number>);

    return Object.entries(stateDurations).reduce((total, [stateId, duration]) => {
        const hourlyEarning = earningsMap[stateId] || 0;
        return total + (hourlyEarning * duration);
    }, 0);
};

export const getLatestPosition = (positions: Position[]): Position => {
    return positions.reduce((latest, current) => {
        return new Date(latest.date) > new Date(current.date) ? latest : current;
    });
};

export const getLatestState = (equipmentId: string): EquipmentState | null => {
    const equipmentStateHistory = equipmentStateHistoryData.find(
        (history) => history.equipmentId === equipmentId
    );

    if (!equipmentStateHistory) return null;

    const latestState = equipmentStateHistory.states.reduce((latest, current) => {
        return new Date(latest.date) > new Date(current.date) ? latest : current;
    });

    return equipmentStateData.find((state) => state.id === latestState.equipmentStateId) || null;
};

export const getHistory = (equipmentId: string): { date: string, state: string }[] => {
    const history = equipmentStateHistory.find(h => h.equipmentId === equipmentId)?.states || [];
    return history.slice(-5).map(state => ({
        date: formatDate(state.date),
        state: getStateById(state.equipmentStateId),
    }));
};

export const getStateById = (id: string): string => {
    return equipmentStateData.find(state => state.id === id)?.name || 'Desconhecido';
};

export const calculateProductivity = (equipmentId: string): string => {
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

export const getTotalHours = (sortedHistory: { date: Date, stateId: string }[]): number => {
    return sortedHistory
        .reduce((acc, curr, index, array) => {
            if (index === 0) return acc;
            const prevDate = array[index - 1].date;
            const currDate = curr.date;
            const hours = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60);
            return acc + hours;
        }, 0);
};

export const getProductiveHours = (sortedHistory: { date: Date, stateId: string }[]): number => {
    return sortedHistory
        .reduce((acc, curr, index, array) => {
            if (index === 0) return acc;
            const prevDate = array[index - 1].date;
            const currDate = curr.date;
            const hours = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60);

            const isProductive = getStateById(curr.stateId) === 'Operando';
            return acc + (isProductive ? hours : 0);
        }, 0);
};

export const getIcon = (name: string | undefined): string => {
    switch (name) {
        case 'Caminhão de carga':
            return truckIcon;
        case 'Harvester':
            return harvesterIcon;
        case 'Garra traçadora':
            return clawIcon;
        default:
            return aikoIcon;
    }
};