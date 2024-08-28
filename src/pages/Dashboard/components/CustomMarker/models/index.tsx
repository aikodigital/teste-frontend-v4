import { useEquipment } from '@/hooks';

import { MarkerListProps } from '../../Map/models';

export interface CustomMarkerProps extends MarkerListProps {
  useEquipmentHook?: typeof useEquipment;
}
