import equipmentData from '../data/equipment.json';
import positionData from '../data/equipmentPositionHistory.json';
import equipmentStates from '../data/equipmentState.json'; // Corrigido para o arquivo correto
import equipmentModels from '../data/equipmentModel.json'; // Correto
import stateData from '../data/equipmentStateHistory.json'
import { EquipmentPosition } from '../types/equipmentTypes';

// Função para obter a cor de estado para um equipamento
export const getStateColor = (equipmentId: string): string => {
    const stateHistory = stateData.find((equipment: any) => equipment.equipmentId === equipmentId);
    if (stateHistory) {
        const latestState = stateHistory.states[stateHistory.states.length - 1];
        const stateInfo = equipmentStates.find((state: any) => state.id === latestState.equipmentStateId);
        return stateInfo ? stateInfo.color : '#000000';
    }
    return '#000000';
};

// Função para obter as posições mais recentes dos equipamentos
export const getEquipmentPositions = async (): Promise<EquipmentPosition[]> => {
    const latestPositions: EquipmentPosition[] = positionData.map((equipment: any) => {
        const latestPosition = equipment.positions[equipment.positions.length - 1];
        const equipmentInfo = equipmentData.find((e: any) => e.id === equipment.equipmentId);
        const model = equipmentModels.find((m: any) => m.id === equipmentInfo?.equipmentModelId);
        const state = stateData.find((s: any) => s.equipmentId === equipment.equipmentId);
        const latestState = state ? state.states[state.states.length - 1] : null;
        const stateInfo = latestState ? equipmentStates.find((st: any) => st.id === latestState.equipmentStateId) : null;

        return {
            id: equipment.equipmentId,
            lat: latestPosition.lat,
            lon: latestPosition.lon,
            date: latestPosition.date,
            equipmentName: equipmentInfo?.name || 'Desconhecido',
            stateName: stateInfo?.name || 'Desconhecido',
            stateColor: stateInfo?.color || '#000000',
            modelName: model?.name || 'Desconhecido',
        };
    });

    return latestPositions;
};

interface StateInfo {
    date: string;
    state: string; // Nome do estado
}

// Função para obter o histórico de estados para um equipamento específico
export const getEquipmentStateHistory = (equipmentId: string): StateInfo[] => {
    // Encontra o histórico de estados para o equipamento
    const stateHistory = stateData.find((item: any) => item.equipmentId === equipmentId);

    if (!stateHistory) {
        return []; // Retorna um array vazio se o histórico não for encontrado
    }

    // Mapeia os estados no histórico para incluir o nome do estado
    return stateHistory.states.map((stateEntry: any) => {
        const stateInfo = equipmentStates.find((state: any) => state.id === stateEntry.equipmentStateId);

        return {
            date: stateEntry.date,
            state: stateInfo ? stateInfo.name : 'Desconhecido', // Obtém o nome do estado ou 'Desconhecido'
        };
    });
};

export const getImageByModel = (modelName: string): string => {
    switch (modelName) {
        case 'Caminhão de carga':
            return '../assets/images/caminhao.jpg'; // Caminho para a imagem do caminhão
        case 'Garra ':
            return '../assets/images/garra.png'; // Caminho para a imagem da garra
        case 'Harvester':
            return '../assets/images/harvester.png'; // Caminho para a imagem do harvester
        default:
            return '../assets/images/default.png'; // Imagem padrão, se o modelo não corresponder
    }
};