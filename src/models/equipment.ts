import { Default } from './default';
import { EquipmentModel } from './equipment-model';
import { EquipmentPosition } from './equipment-position';
import { EquipmentState } from './equipment-state';
import { State } from './state';

export class Equipment extends Default {
  equipmentModelId: string;
  name: string;
  equipmentModel?: EquipmentModel;
  state?: State;
  states?: EquipmentState[];
  positions?: EquipmentPosition[];
}
