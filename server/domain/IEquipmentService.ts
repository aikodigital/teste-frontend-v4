import type { Equipments } from "@dtos/Equipment";
import type { EquipmentsModel } from "@dtos/EquipmentModel";
import type { EquipmentsPositionHistory } from "@dtos/EquipmentPositionHistory";
import type { EquipmentsState } from "@dtos/EquipmentState";
import type { EquipmentsStateHistory, EquipmentStateHistory } from "@dtos/EquipmentStateHistory";

export interface IEquipmentService {
  getEquipments(): Promise<Equipments>;
  getEquipmentsModel(): Promise<EquipmentsModel>;
  getEquipmentsPositionHistory(): Promise<EquipmentsPositionHistory>;
  getEquipmentsState(): Promise<EquipmentsState>;
  getEquipmentsStateHistory(): Promise<EquipmentsStateHistory>;
  getEquipmentsStateHistoryById(id: string): Promise<EquipmentStateHistory>;
}
