import { MapContainerProps } from 'react-leaflet';

import { useEquipment } from '@/hooks';

import {
  IEquipment,
  IEquipmentPositionHistory,
  IEquipmentState,
} from '@/@types';

export interface MapProps extends MapContainerProps {
  equipmentList: IEquipment[];
  equipmentHistory?: IEquipment['id'];
  useEquipmentHook?: typeof useEquipment;
}

export interface MarkerListProps {
  equipment: IEquipment;
  iconUrl: string;
  position: IEquipmentPositionHistory['positions'][0];
  state: IEquipmentState;
  isEquipmentPositionHistory?: boolean;
}
