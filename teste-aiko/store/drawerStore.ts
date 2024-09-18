import { create } from "zustand";

interface DrawerState {
  drawerStatus: boolean;
  setDrawerStatus: (status: boolean) => void;
}


export const drawerStore = create<DrawerState>((set) => ({
  drawerStatus: false,
  setDrawerStatus: (status: boolean) => set({ drawerStatus: status }),
  toggleDrawerStatus: () =>
    set((state) => ({
      drawerStatus: !state.drawerStatus,
    })),
}));
