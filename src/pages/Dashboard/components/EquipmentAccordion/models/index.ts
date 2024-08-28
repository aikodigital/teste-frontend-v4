import { useEquipment } from '@/hooks';

import { IEquipment } from '@/@types';

export interface EquipmentAccordionProps {
  equipment: IEquipment;
  useEquipmentHook?: typeof useEquipment;
}
