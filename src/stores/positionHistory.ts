import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from "@/stores/api";
import {
    type EquipmentPositionHistory,
    type LatestEquipmentInfo
} from "@/types/types";

export const usePositionHistoryStore = defineStore('positionHistory', () => {
    const latestEquipmentInfo = ref<LatestEquipmentInfo[]>([]);
    const apiStore = useApiStore();

    const getLatestPosition = (equipment: EquipmentPositionHistory) => {
        if (equipment.positions && equipment.positions.length > 0) {
            return equipment.positions.reduce((latest, current) => {
                return new Date(current.date) > new Date(latest.date)
                    ? current
                    : latest;
            }, equipment.positions[0]);
        }
        return null;
    };

    const getLatestPositionsHistory = () => {
        if (
            apiStore.equipmentPositionHistory.length > 0 &&
            apiStore.equipments.length > 0 &&
            apiStore.equipmentStateHistory.length > 0 &&
            apiStore.equipmentState.length > 0
        ) {
            latestEquipmentInfo.value = apiStore.equipmentPositionHistory
                .reduce((acc: LatestEquipmentInfo[], equipment: EquipmentPositionHistory) => {
                    const latestPosition = getLatestPosition(equipment);
    
                    if (!latestPosition) return acc;
    
                    const equipmentInfo = apiStore.equipments.find(
                        (eq) => eq.id === equipment.equipmentId
                    );
    
                    if (!equipmentInfo) return acc;
    
                    const stateHistory = apiStore.equipmentStateHistory.find(
                        (state) => state.equipmentId === equipment.equipmentId
                    );
   
                    const latestState = stateHistory
                        ? stateHistory.states.reduce((latest, current) =>
                              new Date(current.date) > new Date(latest.date)
                                  ? current
                                  : latest
                          )
                        : null;
    
                    const currentStateId = latestState
                        ? latestState.equipmentStateId
                        : "ID do Estado Desconhecido";
    
                    const stateInfo = apiStore.equipmentState.find(
                        (state) => state.id === currentStateId
                    );
    
                    const currentStateName = stateInfo
                        ? stateInfo.name
                        : "Estado Desconhecido";
    
                    const color = stateInfo ? stateInfo.color : "blue";
    
                    const equipmentModel = apiStore.equipmentsModel.find(
                        (model) => model.id === equipmentInfo.equipmentModelId
                    );
    
                    const equipmentModelName = equipmentModel
                        ? equipmentModel.name
                        : "Modelo Desconhecido";
    
                    const hourlyEarnings = equipmentModel?.hourlyEarnings.find(
                        (earning) => earning.equipmentStateId === currentStateId
                    );
    
                    const value = hourlyEarnings ? hourlyEarnings.value : 0;
    
                    acc.push({
                        ...latestPosition,
                        equipmentId: equipment.equipmentId,
                        equipmentName: equipmentInfo.name,
                        currentStateId,
                        currentStateName,
                        color,
                        equipmentModelId: equipmentInfo.equipmentModelId,
                        equipmentModelName,
                        value,
                    });
    
                    return acc;
                }, []);
        } else {
            latestEquipmentInfo.value = [];
        }
    };

    return {
        latestEquipmentInfo,
        getLatestPosition,
        getLatestPositionsHistory
    }
});