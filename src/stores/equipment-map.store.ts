import { ProcessedEquipment } from "@/hooks/use-equipment-data.hook";
import { create } from "zustand";

interface EquipmentMapStore {
  selectedState: string | undefined;
  selectedModel: string | undefined;
  setSelectedState: (state: string | undefined) => void;
  setSelectedModel: (model: string | undefined) => void;

  data: ProcessedEquipment[];
  setData: (data: ProcessedEquipment[]) => void;
}

export const useEquipmentMapStore = create<EquipmentMapStore>((set) => ({
  selectedState: undefined,
  selectedModel: undefined,
  setSelectedState: (state: string | undefined) =>
    set({ selectedState: state }),
  setSelectedModel: (model: string | undefined) =>
    set({ selectedModel: model }),

  data: [],
  setData: (data: ProcessedEquipment[]) => set({ data }),
}));
