import { IEquipmentModel } from './iEquipmentModel';
import { IEquipmentState } from './iEquipmentState';
import { IPosition } from './iPosition';

export interface ICustomEquipment {
  id: string;
  equipmentModelId: string;
  name: string;
  latestPosition: IPosition;
  model: IEquipmentModel;
  stateList: IEquipmentState[];
}
