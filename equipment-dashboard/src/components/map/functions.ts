import equipmentPositionHistory from '../../data/equipmentPositionHistory.json';
import equipmentStateHistory from '../../data/equipmentStateHistory.json';
import equipmentState from '../../data/equipmentState.json';
import equipments from '../../data/equipment.json';
import equipmentModel from '../../data/equipmentModel.json';

export const getPositionsHistoryWithModelId = () => {
    return equipmentPositionHistory.map((equipment) => {
        const sortedPositions = equipment.positions.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const recentPositions = sortedPositions.slice(0, 5);
        const latestPosition = sortedPositions[0];

        const matchedEquipment = equipments.find(e => e.id === equipment.equipmentId);
        const equipmentModelId = matchedEquipment ? matchedEquipment.equipmentModelId : null;
        const equipmentModelName = equipmentModel.find(m => m.id === equipmentModelId)?.name || 'Modelo Desconhecido';

        return {
            equipmentId: equipment.equipmentId,
            equipmentModelId: equipmentModelId,
            equipmentModelName: equipmentModelName,
            latestPosition,
            recentPositions,
        };
    });
};

export const getLatestStateHistory = () => {
    return equipmentStateHistory.map((equipment) => {
        const latestState = equipment.states
            .slice()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

        return {
            equipmentId: equipment.equipmentId,
            date: latestState.date,
            equipmentStateId: latestState.equipmentStateId,
        };
    });
};

export const getEnrichedStates = () => {
    const latestStates = getLatestStateHistory();
    return latestStates.map(state => {
        const correspondingState = equipmentState.find(e => e.id === state.equipmentStateId);
        return {
            ...state,
            stateName: correspondingState ? correspondingState.name : 'Estado Desconhecido',
            stateColor: correspondingState ? correspondingState.color : '#000000',
        };
    });
};
