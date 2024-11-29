import { fetchData } from "@/utils/fetch-data.util";
import {
  Equipment,
  EquipmentModel,
  EquipmentState,
  EquipmentStateHistory,
  EquipmentPositionHistory,
  MaintenanceModel,
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

  getMaintenanceModels: (): Promise<MaintenanceModel[]> =>
    fetchData<MaintenanceModel[]>("/data/maintenance-position.json"),
};
