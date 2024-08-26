import {
  IEquipment,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory,
} from '@/@types';

export interface IUseProcessData {
  getEquipmentModel: (
    equipmentModelId: IEquipmentModel['id']
  ) => IEquipmentModel | undefined;
  getEquipmentState: (
    equipmentStateId: IEquipmentState['id']
  ) => IEquipmentState | undefined;
  getEquipmentList: () => IEquipment[];
  getEquipmentPositionHistory: (
    equipmentId: IEquipment['id']
  ) => IEquipmentPositionHistory | undefined;
  getEquipmentStateHistory: (
    equipmentId: IEquipment['id']
  ) => IEquipmentStateHistory | undefined;
}
