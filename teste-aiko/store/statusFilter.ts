import { create } from "zustand";

interface statusFilterState {
  Status: 'Todos os Status' | 'Operando' | 'Manutenção' | 'Parado';
  setStatus: (status: 'Todos os Status' | 'Operando' | 'Manutenção' | 'Parado') => void;
}


export const statusFilter = create<statusFilterState>((set) => ({
  Status: 'Todos os Status',
  setStatus: (status: 'Todos os Status' | 'Operando' | 'Manutenção' | 'Parado') => set({ Status: status }),
}));
