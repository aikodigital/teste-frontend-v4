import { EquipmentState } from "../models/equipmentState";
import equimentState from "../content/data/equipmentState.json"
import { useEffect, useState } from "react";

export const useEquipmentState = () => {
    const [equipmentStates, setEquipmentStates] = useState<EquipmentState[]>([]);

    useEffect(() => {
        setEquipmentStates(equimentState);
    }, []);

    const filterEquipmentState = (id?: string, name?: string, color?: string) => {
        return equipmentStates.filter((equipmentState) => {
            if (id) return equipmentState.id === id;
            if (name) return equipmentState.name === name;
            if (color) return equipmentState.color === color;
        });
    }

    interface DesiredDate {
        date: string;
        equipmentStateId: string;
    }


    interface Possibility {
        date: string;
        equipmentStateId: string;
    }

    const findClosestDate = (desiredDate: DesiredDate, dates: Possibility[]): Possibility | null => {
        const datesWithState = dates.filter((date) => date.date === desiredDate.date);
        if (datesWithState.length === 0) return null;

        const closestDate = datesWithState.reduce((prev, current) => {
            return Math.abs(new Date(prev.date).getTime() - new Date(desiredDate.date).getTime()) <
                Math.abs(new Date(current.date).getTime() - new Date(desiredDate.date).getTime()) ? prev : current;
        });

        return closestDate;
    }

    return {
        equipmentStates,
        filterEquipmentState,
        findClosestDate,
    }
}
