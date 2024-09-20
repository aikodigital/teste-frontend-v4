import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
    type Equipment,
    type EquipmentModel,
    type EquipmentPositionHistory,
    type EquipmentState,
    type EquipmentStateHistory,
    type LatestEquipmentInfo
} from "@/types/types";

export const useApiStore = defineStore('api', () => {

    const equipmentPositionHistory = ref<EquipmentPositionHistory[]>([]);
    const equipments = ref<Equipment[]>([]);
    const equipmentsModel = ref<EquipmentModel[]>([]);
    const equipmentStateHistory = ref<EquipmentStateHistory[]>([]);
    const equipmentState = ref<EquipmentState[]>([]);
    const latestEquipmentInfo = ref<LatestEquipmentInfo[]>([]);

    const fetchPositionHistory = async () => {
        try {
            const response = await fetch("/data/equipmentPositionHistory.json");
            equipmentPositionHistory.value = await response.json();
        } catch (error) {
            console.error("Erro ao carregar as posições dos equipamentos:", error);
        }
    };
    
    const fetchEquipments = async () => {
        try {
            const response = await fetch("/data/equipment.json");
            equipments.value = await response.json();
        } catch (error) {
            console.error("Erro ao carregar os equipamentos:", error);
        }
    };
    
    const fetchEquipmentsModel = async () => {
        try {
            const response = await fetch("/data/equipmentModel.json");
            equipmentsModel.value = await response.json();
        } catch (error) {
            console.error("Erro ao carregar os modelos dos equipamentos:", error);
        }
    };
    
    const fetchStateHistory = async () => {
        try {
            const response = await fetch("/data/equipmentStateHistory.json");
            equipmentStateHistory.value = await response.json();
        } catch (error) {
            console.error(
                "Erro ao carregar o histórico de estado dos equipamentos:",
                error
            );
        }
    };
    
    const fetchState = async () => {
        try {
            const response = await fetch("/data/equipmentState.json");
            equipmentState.value = await response.json();
        } catch (error) {
            console.error(
                "Erro ao carregar o estado dos equipamentos:",
                error
            );
        }
    };

    const fetchAllData = async () => {
        await fetchPositionHistory();
        await fetchEquipments();
        await fetchEquipmentsModel();
        await fetchStateHistory();
        await fetchState();
    }

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
            equipmentPositionHistory.value.length > 0 &&
            equipments.value.length > 0 &&
            equipmentStateHistory.value.length > 0 &&
            equipmentState.value.length > 0
        ) {
            latestEquipmentInfo.value = equipmentPositionHistory.value
                .reduce((acc: LatestEquipmentInfo[], equipment: EquipmentPositionHistory) => {
                    const latestPosition = getLatestPosition(equipment);
    
                    if (!latestPosition) return acc;
    
                    const equipmentInfo = equipments.value.find(
                        (eq) => eq.id === equipment.equipmentId
                    );
    
                    if (!equipmentInfo) return acc;
    
                    const stateHistory = equipmentStateHistory.value.find(
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
    
                    const stateInfo = equipmentState.value.find(
                        (state) => state.id === currentStateId
                    );
    
                    const currentStateName = stateInfo
                        ? stateInfo.name
                        : "Estado Desconhecido";
    
                    const color = stateInfo ? stateInfo.color : "blue";
    
                    const equipmentModel = equipmentsModel.value.find(
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
        equipmentPositionHistory,
        equipments,
        equipmentsModel,
        equipmentStateHistory,
        equipmentState,
        latestEquipmentInfo,

        fetchPositionHistory,
        fetchEquipments,
        fetchEquipmentsModel,
        fetchStateHistory,
        fetchAllData,

        getLatestPositionsHistory
    }
});
