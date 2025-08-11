import { create } from "zustand";

type state = {
    equipmentId: string | undefined;
    stateId: string | undefined;
    modelId: string | undefined;
};

type action = {
    setEquipmentId: (equipmentId: string | undefined) => void;
    setStateId: (stateId: string | undefined) => void;
    setModelId: (modelId: string | undefined) => void;
};

const useFilterStore = create<state & action>((set) => ({
    equipmentId: undefined,
    stateId: undefined,
    modelId: undefined,
    setEquipmentId: (equipmentId: string | undefined) => set({ equipmentId }),
    setStateId: (stateId: string | undefined) => set({ stateId }),
    setModelId: (modelId: string | undefined) => set({ modelId })
}));

export default useFilterStore;