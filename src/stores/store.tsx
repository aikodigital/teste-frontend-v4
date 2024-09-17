import { create } from 'zustand'
import { IEquipmentStore, IEquipmentStates } from './storeTypes'

const Equipment = create<IEquipmentStore>((set) => ({
  equipment: [],
  setEquipment: (equipmentData) => set({ equipment: equipmentData })
}))

const EquipmentStates = create<IEquipmentStates>((set) => ({
  equipmentStates: [],
  setEquipmentStates: (equipmentStatesData) =>
    set({ equipmentStates: equipmentStatesData })
}))

export default {
  Equipment,
  EquipmentStates
}
