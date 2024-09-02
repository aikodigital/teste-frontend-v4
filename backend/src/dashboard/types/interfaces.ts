export type Root = Root2[];

export interface Root2 {
  _id: string;
  equipment: Equipment;
  states: State[];
  __v: number;
}

export interface Equipment {
  _id: string;
  equipmentModel: EquipmentModel;
  name: string;
  __v: number;
}

export interface EquipmentModel {
  _id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
  __v: number;
}

export interface HourlyEarning {
  _id: string;
  equipmentState: EquipmentState;
  value: number;
  __v: number;
}

export interface EquipmentState {
  _id: string;
  name: string;
  color: string;
  __v: number;
}

export interface State {
  date: string;
  equipmentState: EquipmentState2;
  _id: string;
}

export interface EquipmentState2 {
  _id: string;
  name: string;
  color: string;
  __v: number;
}
