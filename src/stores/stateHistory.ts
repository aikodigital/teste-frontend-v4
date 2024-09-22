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
    };

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

    const calculateProductivity = (states: StateData[]) => {
        if (states.length < 2) return { productivity: 0, lastState: "Último estado desconhecido" };

        const sortedStates = states.sort((a, b) => {
            const dateA = new Date(a.date || 0).getTime();
            const dateB = new Date(b.date || 0).getTime();
            return dateB - dateA;
        });

        const lastState = sortedStates[0];
        const penultimateState = sortedStates[1];

        if (lastState.equipmentStateName === "Operando") {
            const lastDate = new Date(lastState.date || 0);
            const penultimateDate = new Date(penultimateState.date || 0);

            const diffInMs = lastDate.getTime() - penultimateDate.getTime();
            const diffInHours = diffInMs / (1000 * 60 * 60);

            const productivity = (diffInHours / 24) * 100;

            return { productivity: productivity, lastState: "Operando" };
        }

        return { productivity: 0, lastState: "Último estado desconhecido" };
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

            const { productivity, lastState } = equipmentStateHistory.states
                ? calculateProductivity(equipmentStateHistory.states)
                : { productivity: 0, lastState: "Último estado desconhecido"  }

            equipmentStateHistory['productivity'] = productivity;
            equipmentStateHistory['lastState'] = lastState;

            stateHistoryData.value = equipmentStateHistory;
        } else {
            stateHistoryData.value = {};
        }
    };

    return {
        showStateHistory,
        stateHistoryData,
        setStateHistoryView,
        resetStateHistoryData,
        mapEquipmentData,
        addStateNames,
        calculateProductivity,
        getStateHistory,
    };
});
