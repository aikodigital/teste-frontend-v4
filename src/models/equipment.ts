import { Default } from './default';
import { EquipmentModel } from './equipment-model';
import { State } from './state';

export class Equipment extends Default {
  equipmentModelId: string;
  name: string;
  equipmentModel: EquipmentModel;
  state: State;
}
