import { ProcessedEquipment } from "@/hooks/use-equipment-data.hook";
import { create } from "zustand";

interface EquipmentMapStore {
  selectedState: string | undefined;
  selectedModel: string | undefined;
  setSelectedState: (state: string | undefined) => void;
  setSelectedModel: (model: string | undefined) => void;

  searchData: ProcessedEquipment[];
  setSearchData: (data: ProcessedEquipment[]) => void;

  search: string;
  setSearch: (value: string) => void;
}

export const useEquipmentMapStore = create<EquipmentMapStore>((set) => ({
  selectedState: undefined,
  selectedModel: undefined,
  setSelectedState: (state: string | undefined) =>
    set({ selectedState: state }),
  setSelectedModel: (model: string | undefined) =>
    set({ selectedModel: model }),

  searchData: [],
  setSearchData: (data: ProcessedEquipment[]) => set({ searchData: data }),

  search: "",
  setSearch: (value) => set({ search: value }),
}));
