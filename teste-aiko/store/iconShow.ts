import { create } from "zustand";

interface iconShowState {
  iconShowStatus: boolean;
  toggleIconShowStatus: () => void;
  setIconShowStatus: (status: boolean) => void;
}


export const iconShow = create<iconShowState>((set) => ({
  iconShowStatus: true,
  setIconShowStatus: (status: boolean) => set({ iconShowStatus: status }),
  toggleIconShowStatus: () =>
    set((state) => ({
      iconShowStatus: !state.iconShowStatus,
    })),
}));
