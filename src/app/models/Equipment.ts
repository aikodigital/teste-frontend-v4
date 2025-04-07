import type { EquipementModel } from "./EquipmentModel";
import { EquipmentState } from "./EquipmentState";
import type { Position } from "./Position";

export type Equipment = {
  id: string;
  equipmentModelId: string,
  name: string;
  model: EquipementModel;
  positions: Position[];
  states: EquipmentState[];
  mostRecentState: EquipmentState | null;
}