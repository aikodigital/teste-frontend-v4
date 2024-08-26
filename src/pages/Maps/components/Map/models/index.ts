import { MapContainerProps } from 'react-leaflet';

import { useProcessData } from '@/hooks';

import { IEquipment } from '@/@types';

export interface MapProps extends MapContainerProps {
  equipmentList: IEquipment[];
  equipmentHistory?: IEquipment['id'];
  useProcessDataHook?: typeof useProcessData;
}
