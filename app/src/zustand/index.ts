import { create } from 'zustand';
import {
  IEquipment,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory
} from './interface';

interface EquipmentState {
  equipments: IEquipment[];
  equipmentModel: IEquipmentModel[];
  equipmentPositionHistory: IEquipmentPositionHistory[];
  equipmentState: IEquipmentState[];
  equipmentStateHistory: IEquipmentStateHistory[];
  setEquipments: (equipments: IEquipment[]) => void;
  setEquipmentModel: (models: IEquipmentModel[]) => void;
  setEquipmentPositionHistory: (history: IEquipmentPositionHistory[]) => void;
  setEquipmentState: (states: IEquipmentState[]) => void;
  setEquipmentStateHistory: (history: IEquipmentStateHistory[]) => void;
}

const useEquipmentStore = create<EquipmentState>(set => ({
  equipments: [],
  equipmentModel: [],
  equipmentPositionHistory: [],
  equipmentState: [],
  equipmentStateHistory: [],
  setEquipments: equipments => set(() => ({ equipments })),
  setEquipmentModel: models => set(() => ({ equipmentModel: models })),
  setEquipmentPositionHistory: history =>
    set(() => ({ equipmentPositionHistory: history })),
  setEquipmentState: states => set(() => ({ equipmentState: states })),
  setEquipmentStateHistory: history =>
    set(() => ({ equipmentStateHistory: history }))
}));

export default useEquipmentStore;
