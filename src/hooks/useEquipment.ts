import { useEffect, useState } from "react";
import equiments from "../content/data/equipment.json";
import { Equipment } from "../models/equipment";
import { useEquipmentState } from "./useEquipmentState";
import { EquipmentHistoryState } from "../models/equipmentHistoryState";
import equimentStateHistory from "../content/data/equipmentStateHistory.json";

export const useEquipments = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);

    useEffect(() => {
        setEquipments(equiments);
    }, []);

    const filterEquipments = (id?: string, equipmentModelId?: string, name?: string) => {
        return equipments.filter((equipment) => {
            if (id) return equipment.id === id;
            if (equipmentModelId) return equipment.equipmentModelId === equipmentModelId;
            if (name) return equipment.name === name;
        });
    }

    const [equipmentHistoryStates, setEquipmentHistoryStates] = useState<EquipmentHistoryState[]>([]);
    const { filterEquipmentState } = useEquipmentState();

    useEffect(() => {
        setEquipmentHistoryStates(equimentStateHistory);
    }, []);

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

        const model = filterEquipments(equipment.equipmentId);
        if (!model) return null;

        return {
            equipmentStateId: closestState.equipmentStateId,
            stateName: stateName || 'Estado Desconhecido',
            date: closestState.date,
        };
    }

    return {
        equipments,
        filterEquipments,
        findTheClosesTimeInComparisionToTheOtherTimeOfTheEquipment,
    }
}