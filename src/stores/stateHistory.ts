import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from "@/stores/api";
import { type StateHistoryData, type StateData } from "@/types/types";

export const useStateHistoryStore = defineStore('stateHistory', () => {
    const showStateHistory = ref<boolean>(false);
    const stateHistoryData = ref<StateHistoryData>({});
    const apiStore = useApiStore();

    const setStateHistoryView = (status: boolean) => {
        showStateHistory.value = status;
    };

    const resetStateHistoryData = () => {
        stateHistoryData.value = {};
    }

    const mapEquipmentData = () => {
        return apiStore.equipments.map(equipment => {
            const equipmentModel = apiStore.equipmentsModel.find(model => model.id === equipment.equipmentModelId);

            return {
                equipmentId: equipment.id,
                equipmentName: equipment.name,
                equipmentModelId: equipment.equipmentModelId,
                equipmentModelName: equipmentModel ? equipmentModel.name : "Modelo Desconhecido",
            };
        });
    };

    const addStateNames = (oldStates: StateData[]) => {
        return oldStates.map((stateEntry: StateData) => {
            const stateInfo = apiStore.equipmentState.find(state => state.id === stateEntry.equipmentStateId);
            return {
                ...stateEntry,
                equipmentStateName: stateInfo ? stateInfo.name : "Estado desconhecido"
            };
        })
    };

    const getStateHistory = (equipmentId: string) => {
        const equipmentMaping = mapEquipmentData();
        const equipmentInfo = equipmentMaping.find(equipment => equipment.equipmentId === equipmentId);
        const equipmentStateHistory = apiStore.equipmentStateHistory.find(
            equipment => equipment.equipmentId == equipmentId
        ) as StateHistoryData | undefined;

        if (equipmentStateHistory) {
            equipmentStateHistory['equipmentName'] = equipmentInfo ? equipmentInfo.equipmentName : "Nome do equipamento desconhecido";
            equipmentStateHistory['equipmentModelId'] = equipmentInfo ? equipmentInfo.equipmentModelId : "ID do modelo desconhecido";
            equipmentStateHistory['equipmentModelName'] = equipmentInfo ? equipmentInfo.equipmentModelName : "Nome do modelo desconhecido";

            equipmentStateHistory.states = equipmentStateHistory.states ? addStateNames(equipmentStateHistory.states) : [];

            stateHistoryData.value = equipmentStateHistory;
        } else {
            stateHistoryData.value = {};
        }
    };

    return { showStateHistory, setStateHistoryView, getStateHistory, stateHistoryData, resetStateHistoryData };
});
