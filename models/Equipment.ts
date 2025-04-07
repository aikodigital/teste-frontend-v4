import type { EquipementModel } from "./EquipmentModel";
import type { Position } from "./Position";
import type { State } from "./State";


export type Equipment = {
  id: string;
  equipmentModelId: string,
  name: string;
  model: EquipementModel;
  positions: Position[];
  states: State[];
}