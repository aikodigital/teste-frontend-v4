import { fetchData } from "@/utils/fetch-data";
import {
  Equipment,
  EquipmentModel,
  EquipmentState,
  EquipmentStateHistory,
  EquipmentPositionHistory,
} from "@/types/equipment.type";

export const EquipmentService = {
  getEquipments: (): Promise<Equipment[]> =>
    fetchData<Equipment[]>("/data/equipment.json"),

  getEquipmentModels: (): Promise<EquipmentModel[]> =>
    fetchData<EquipmentModel[]>("/data/equipment-model.json"),

  getEquipmentStates: (): Promise<EquipmentState[]> =>
    fetchData<EquipmentState[]>("/data/equipment-state.json"),

  getEquipmentStateHistory: (): Promise<EquipmentStateHistory[]> =>
    fetchData<EquipmentStateHistory[]>("/data/equipment-state-history.json"),

  getEquipmentPositionHistory: (): Promise<EquipmentPositionHistory[]> =>
    fetchData<EquipmentPositionHistory[]>(
      "/data/equipment-position-history.json",
    ),
};
