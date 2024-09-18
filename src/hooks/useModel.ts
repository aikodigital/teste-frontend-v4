import { useEffect, useState } from "react";
import equipmentModel from "../content/data/equipmentModel.json";
import { EquipmentModel } from '../models/equipmentModel';
import { useEquipmentState } from "./useEquipmentState";
import { useHistoryState } from "./useHistoryState";

export const useModel = () => {
    const { filterEquipmentState } = useEquipmentState();

    const [equipmentModels, setEquipmentModels] = useState<EquipmentModel[]>([]);

    useEffect(() => {
        return setEquipmentModels(equipmentModel);
    }, []);

    const filterEquipmentModel = (id?: string) => {
        return equipmentModels.filter((equipmentModel) => {
            if (id) return equipmentModel.id === id;
        });
    }

    const filterEquipmentWithMostHoursEarningsByState = (state: string) => {

        const equipmentState = filterEquipmentState(state);

        const equipmentModel = equipmentModels.find((equipmentModel) => equipmentModel.hourlyEarnings.some((hourlyEarning) => equipmentState.map((state) => state.id).includes(hourlyEarning.equipmentStateId)));

        if (!equipmentModel) return 0;
        const maxHourlyEarnings = Math.max(...equipmentModel.hourlyEarnings.map((hourlyEarning) => hourlyEarning.value));
        return equipmentModel.hourlyEarnings.filter((hourlyEarning) => hourlyEarning.value === maxHourlyEarnings).map((hourlyEarning) => {
            return {
                equipmentName: equipmentModel.name,
                hourlyEarnings: hourlyEarning.value
            }
        });
    }

    return {
        equipmentModels,
        filterEquipmentModel,
        filterEquipmentWithMostHoursEarningsByState
    }
}