import { useState, useEffect } from 'react';

import equipmentPositionHistory from '../content/data/equipmentPositionHistory.json';
import { EquipmentPositionHistory } from '../models/positionHistory';
import { useModel } from './useModel';
import { useEquipments } from './useEquipment';
import { useHistoryState } from './useHistoryState';

export const usePositionsHistory = () => {
    const [positionsHistory, setPositionsHistory] = useState<EquipmentPositionHistory[]>([]);
    const { filterEquipmentModel } = useModel();
    const { filterEquipments, findTheClosesTimeInComparisionToTheOtherTimeOfTheEquipment } = useEquipments();
    const { getHistoryOfEquipmentState, filterAllTheSameStatesOfThEquipment } = useHistoryState();

    useEffect(() => {
        setPositionsHistory(equipmentPositionHistory);
    }, []);

    const getAllModelsByTheMostRecentTime = () => {
        const models = positionsHistory.map((positionHistory) => {
            const positions = positionHistory.positions;
            const mostRecentPosition = positions.reduce((previousPosition, currentPosition) => {
                return new Date(previousPosition.date) > new Date(currentPosition.date) ? previousPosition : currentPosition;
            });
            const stateForTime = findTheClosesTimeInComparisionToTheOtherTimeOfTheEquipment(positionHistory.equipmentId, mostRecentPosition.date);

            const model = filterEquipments(positionHistory.equipmentId);
            return {
                equipmentId: positionHistory.equipmentId,
                type: {
                    name: model.map((model) => filterEquipmentModel(model.equipmentModelId).map((model) => model.name)),
                    rest: model.map((model) => model)
                },
                position: {
                    lat: mostRecentPosition.lat,
                    lon: mostRecentPosition.lon,
                },
                date: mostRecentPosition.date,
                model: {
                    modelId: model.map((model) => model.id),
                    modelName: model.map((model) => model.name),
                },
                stateForTime: stateForTime,
                historyOfState: getHistoryOfEquipmentState(positionHistory.equipmentId),
                datasComEstadoEncontrado: filterAllTheSameStatesOfThEquipment(stateForTime?.equipmentStateId)

            }
        });
        return {
            models,
        }
    }

    return {
        positionsHistory,
        equipmentPositionHistory,
        getAllModelsByTheMostRecentTime,
    }
};