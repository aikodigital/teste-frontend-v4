import { Default } from './default';
import { EquipmentModel } from './equipment-model';
import { EquipmentPosition } from './equipment-position';
import { EquipmentState } from './equipment-state';

export class Equipment extends Default {
  equipmentModelId: string;
  name: string;
  equipmentModel?: EquipmentModel;
  states: EquipmentState[];
  positions?: EquipmentPosition[];
}
