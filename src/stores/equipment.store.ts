import { create } from "zustand";

interface EquipmentProps {
  id: string;
  name: string;
  model: string;
  position: { lat: number; lon: number };
  state: { name: string; color: string };
}

interface EquipmentStore {
  selectedEquipment: EquipmentProps | null;
  isSheetOpen: boolean;
  openSheet: (equipment: EquipmentProps) => void;
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
