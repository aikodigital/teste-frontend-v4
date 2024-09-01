import equipmentData from '../data/equipment.json';
import equipmentModel from '../data/equipmentModel.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import { calculateProductivity, calculateTotalEarnings, getHistory, getIcon, getLatestPosition, getLatestState } from '../utils/utils';

export const mapEquipmentData = () => {
    return equipmentData.map((equipment) => {
        const positionHistory = equipmentPositionHistoryData.find(
            (history) => history.equipmentId === equipment.id
        );

        const model = equipmentModel.find((e) => e.id === equipment.equipmentModelId);

        if (!positionHistory) {
            throw new Error(`Equipamento não encontrado para o ID: ${equipment.id}`);
        }

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