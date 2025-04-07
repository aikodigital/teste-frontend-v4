import { EquipmentStateHistory } from "../../public/data/mockEquipmentStateHistory";
import { EquipmentPositionHistory } from "../../public/data/mockEquipmentPositionHistory";
import { EquipmentState } from "../../public/data/mockEquipmentState";

export type EquipmentStateName = "Operando" | "Parado" | "Manutenção";

export interface Equipment {
  id: string;
  name: string;
  state: EquipmentStateName;
  model: string;
  color: string;
  position: [number, number];
  hourlyEarnings: number | { equipmentStateId: string; value: number }[];
  stateHistory: EquipmentStateHistory["states"];
  positionHistory: EquipmentPositionHistory["positions"];
  equipmentStates?: EquipmentState[];
}
