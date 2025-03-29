/** Represents an equipment. */
export interface IEquipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

/** Represents the earnings of an equipment. */
interface IEquipmentEarn {
  equipmentStateId: string;
  value: number;
}

/** Represents an equipment model. */
export interface IEquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: IEquipmentEarn[];
}

/** Represents a geographical position of an equipment. */
export interface IEquipmentPosition {
  date: string;
  lat: number;
  lon: number;
}

/** Position history of an equipment. */
export interface IEquipmentPositionHistory {
  equipmentId: string;
  lastPosition: IEquipmentPosition
  positions: IEquipmentPosition[];
}

/** Represents the state of an equipment at a given date. */
export interface IAllEquipmentStates {
 id: string;
 name: string;
 color: string
}

export interface IEquipamentState {
  equipmentStateId: string;
  date: string
}

/** State history of an equipment. */
export interface IEquipmentStateHistory {
  equipmentId: string;
  states:IEquipamentState[],
}

export interface IEquipmentInfo extends IEquipmentStateHistory {
  name: string,
  model: string
}

export interface IEquipmentStatusHistory {
  date: string;
  status: string
}