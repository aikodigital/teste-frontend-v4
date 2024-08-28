import { IEquipmentModel } from './iEquipmentModel';
import { IPosition } from './iPosition';

export interface ICustomEquipment {
  id: string;
  equipmentModelId: string;
  name: string;
  latestPosition: IPosition;
  model: IEquipmentModel;
}
