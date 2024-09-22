import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
    type Equipment,
    type EquipmentModel,
    type EquipmentPositionHistory,
    type EquipmentState,
    type EquipmentStateHistory,
} from "@/types/types";

export const useApiStore = defineStore('api', () => {

    const equipmentPositionHistory = ref<EquipmentPositionHistory[]>([]);
    const equipments = ref<Equipment[]>([]);
    const equipmentsModel = ref<EquipmentModel[]>([]);
    const equipmentStateHistory = ref<EquipmentStateHistory[]>([]);
    const equipmentState = ref<EquipmentState[]>([]);

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
    
    return {
        equipmentPositionHistory,
        equipments,
        equipmentsModel,
        equipmentStateHistory,
        equipmentState,

        fetchPositionHistory,
        fetchEquipments,
        fetchEquipmentsModel,
        fetchStateHistory,
        fetchState,
        fetchAllData,
    }
});
