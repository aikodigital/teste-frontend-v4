import { RootState } from './store';

export const selectAllEquipments = (state: RootState) =>
  state.equipment.equipments;
export const selectAllModels = (state: RootState) => state.equipment.models;
export const selectAllStates = (state: RootState) => state.equipment.states;
export const selectEquipmentStatus = (state: RootState) =>
  state.equipment.status;
export const selectEquipmentError = (state: RootState) => state.equipment.error;
