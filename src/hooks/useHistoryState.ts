import { EquipmentHistoryState } from "../models/equipmentHistoryState";
import equimentStateHistory from "../content/data/equipmentStateHistory.json";
import { useEffect, useState } from "react";
import { useEquipmentState } from "./useEquipmentState";
import { useEquipments } from "./useEquipment";
import { usePositionsHistory } from "./usePositionshistory";

export const useHistoryState = () => {
    const [equipmentHistoryStates, setEquipmentHistoryStates] = useState<EquipmentHistoryState[]>([]);
    const { filterEquipmentState } = useEquipmentState();


    useEffect(() => {
        setEquipmentHistoryStates(equimentStateHistory);
    }, []);


    const getAllTheEquipmentsByTheMostRecentTime = () => {
        const equipments = equipmentHistoryStates.map((equipmentHistoryState) => {
            const states = equipmentHistoryState.states;
            const mostRecentState = states.reduce((previousState, currentState) => {
                return new Date(previousState.date) > new Date(currentState.date) ? previousState : currentState;
            });
            const stateName = filterEquipmentState(mostRecentState.equipmentStateId);

            return {
                equipmentId: equipmentHistoryState.equipmentId,
                equipmentStateId: mostRecentState.equipmentStateId,
                stateName: stateName.map((state) => state.name),
                date: mostRecentState.date,

            }
        });
        return equipments;
    }

    const findTheClosesTimeInComparisionToTheOtherTimeOfTheEquipment = (equipmentId: string, date: string) => {
        const equipment = equipmentHistoryStates.find((equipmentHistoryState) => equipmentHistoryState.equipmentId === equipmentId);

        if (!equipment || !equipment.states || equipment.states.length === 0) return null;

        const states = equipment.states;

        const closestState = states.reduce((previousState, currentState) => {
            const previousDiff = Math.abs(new Date(previousState.date).getTime() - new Date(date).getTime());
            const currentDiff = Math.abs(new Date(currentState.date).getTime() - new Date(date).getTime());
            return previousDiff < currentDiff ? previousState : currentState;
        });

        const stateName = filterEquipmentState(closestState.equipmentStateId);
        if (!stateName) return null;
        return {
            equipmentId: equipment.equipmentId,
            equipmentStateId: closestState.equipmentStateId,
            stateName: stateName || 'Estado Desconhecido',
            date: closestState.date,
        };
    }

    const getHistoryOfEquipmentState = (equipmentId: string) => {
        const equipment = equipmentHistoryStates.find((equipmentHistoryState) => equipmentHistoryState.equipmentId === equipmentId);
        if (!equipment) return null;
        return {
            state: equipment.states.map((state) => {
                const stateName = filterEquipmentState(state.equipmentStateId);
                return {
                    equipmentStateId: equipment.equipmentId,
                    stateName: stateName.map((state) => state.name),
                    date: state.date,
                }
            })
        }
    }

    const filterAllTheSameStatesOfThEquipment = (equipmentStateId?: string) => {
        if (!equipmentStateId) return null;
        const equipment = equipmentHistoryStates.find(equipment =>
            equipment.states.some(state => state.equipmentStateId === equipmentStateId)
        );

        if (!equipment) return null;
        const matchingStates = equipment.states.filter(state => state.equipmentStateId === equipmentStateId);
        return {
            equipmentId: equipment.equipmentId,
            dates: matchingStates.map(state => state.date),
        };
    };

    return {
        getHistoryOfEquipmentState,
        getAllTheEquipmentsByTheMostRecentTime,
        findTheClosesTimeInComparisionToTheOtherTimeOfTheEquipment,
        filterAllTheSameStatesOfThEquipment

    }
}