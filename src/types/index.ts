import { ModelTypesMapping } from "../constants";

export type EquipmentData = {
  equipmentId: string;
  states: Array<{
    date: string;
    equipmentStateId: string;
  }>;
  positions: Array<{
    date: string;
    lat: number;
    lon: number;
  }>;
  id: string;
  equipmentName: ModelTypesMapping;
  name: string;
  hourlyEarnings: Array<{
    equipmentStateId: string;
    value: number;
  }>;
};

export type CompleteEquipmentData = Array<EquipmentData>;
