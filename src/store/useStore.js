import { create } from 'zustand'

export const useModel = create((set) => ({
  selectedModel: 'all',
  selectedStatus: 'all',
  setSelectedModel: (model) => set({ selectedModel: model }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
}))

export const useStates = create((set) => ({
  selectedState: 'all',
  setSelectedState: (state) => set({ selectedModel: state }),
}))
