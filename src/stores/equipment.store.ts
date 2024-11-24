import { ProcessedEquipment } from "@/hooks/use-equipment-data.hook";
import { create } from "zustand";

interface EquipmentStore {
  selectedEquipment: ProcessedEquipment | null;
  isSheetOpen: boolean;
  openSheet: (equipment: ProcessedEquipment) => void;
  closeSheet: () => void;
}

export const useEquipmentStore = create<EquipmentStore>((set) => ({
  selectedEquipment: null,
  isSheetOpen: false,
  openSheet: (equipment) =>
    set({
      selectedEquipment: equipment,
      isSheetOpen: true,
    }),
  closeSheet: () =>
    set({
      selectedEquipment: null,
      isSheetOpen: false,
    }),
}));
