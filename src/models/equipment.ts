import { Default } from './default';
import { EquipmentModel } from './equipment-model';

export class Equipment extends Default {
  equipmentModelId: string;
  name: string;
  equipmentModel: EquipmentModel;
}
