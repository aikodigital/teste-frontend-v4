import { State } from "./State";

export type EquipmentState = {
  id: string;
  name: string;
  color: string;
  date: Date;
}

export type EquipmentStateData = Omit<EquipmentState, 'date'>;
export type EquipmentStateStoryData = {
  equipmentId: string;
  states: State[]
}