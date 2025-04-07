import {
  IEquipment,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory
} from '@/zustand/interface';

export interface ContextProps {
  children: React.ReactNode;
}

export interface IContext {
  get_equipment: () => Promise<IEquipment[]>;
  get_equipment_model: () => Promise<IEquipmentModel[]>;
  get_equipment_position_history: () => Promise<IEquipmentPositionHistory[]>;
  get_equipment_state: () => Promise<IEquipmentState[]>;
  get_equipment_state_history: () => Promise<IEquipmentStateHistory[]>;
  fetch_all_data: () => void;
  fetch_route: (coordinates: [number, number][]) => Promise<void>;
  route: [number, number][] | [];
}
