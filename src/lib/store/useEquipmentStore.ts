import { create } from "zustand";

import { Equipment, EquipmentModel, EquipmentPositionHistory, EquipmentState, EquipmentStateHistory } from "@/types/equipment";

type state = {
    equipments: Array<Equipment>;
    models: Array<EquipmentModel>;
    positionHistory: Array<EquipmentPositionHistory>;
    states: Array<EquipmentState>;
    stateHistory: Array<EquipmentStateHistory>;
};

type Actions = {
    setEquipments: (equipments: Array<Equipment>) => void;
    setModels: (models: Array<EquipmentModel>) => void;
    setPositionHistory: (positionHistory: Array<EquipmentPositionHistory>) => void;
    setStates: (states: Array<EquipmentState>) => void;
    setStateHistory: (stateHistory: Array<EquipmentStateHistory>) => void;
};

const useEquipmentStore = create<state & Actions>((set) => ({
    equipments: [],
    models: [],
    positionHistory: [],
    states: [],
    stateHistory: [],

    setEquipments: (equipments) => set({ equipments }),
    setModels: (models) => set({ models }),
    setPositionHistory: (positionHistory) => set({ positionHistory }),
    setStates: (states) => set({ states }),
    setStateHistory: (stateHistory) => set({ stateHistory })
}));

export default useEquipmentStore;