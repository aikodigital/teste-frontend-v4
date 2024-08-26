import {
  EquipmentState,
  IEquipment,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory,
} from '@/@types';

export type EquipmentPositionHistoryProps =
  | {
      show: false;
      equipmentId: undefined;
      data: undefined;
    }
  | {
      show: true;
      equipmentId: IEquipment['id'];
      data?: IEquipmentPositionHistory;
    };

interface EquipmentProductivity {
  [EquipmentState.OPERATING]: number;
  [EquipmentState.STOPPED]: number;
  [EquipmentState.MAINTENANCE]: number;
}

export interface EquipmentProviderProps {
  children: React.ReactNode;
}

export interface EquipmentContextProps {
  // list functions
  getEquipmentList: () => IEquipment[];
  getEquipmentModelList: () => IEquipmentModel[];
  getEquipmentStateList: () => IEquipmentState[];

  // get functions
  getEquipmentModel: (
    equipmentModelId: IEquipmentModel['id']
  ) => IEquipmentModel | undefined;
  getEquipmentState: (
    equipmentStateId: IEquipmentState['id']
  ) => IEquipmentState | undefined;
  getEquipmentPositionHistory: (
    equipmentId: IEquipment['id']
  ) => IEquipmentPositionHistory | undefined;
  getEquipmentStateHistory: (
    equipmentId: IEquipment['id']
  ) => IEquipmentStateHistory | undefined;

  // utility functions
  getIcon: (props: { equipmentModelId: IEquipmentModel['id'] }) => string;
  getProductivity: (props: {
    equipmentId: IEquipment['id'];
    hours: number;
  }) => EquipmentProductivity;
  getGain: (props: {
    equipmentModelId: IEquipmentModel['id'];
    productivity: EquipmentProductivity;
  }) => number;

  // state functions
  equipmentPositionHistory: EquipmentPositionHistoryProps;
  changeEquipmentPositionHistory: (
    props: EquipmentPositionHistoryProps
  ) => void;
}
