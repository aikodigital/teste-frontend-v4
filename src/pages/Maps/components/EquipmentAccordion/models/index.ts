import { IEquipment } from '@/@types';
import { useProcessData } from '@/hooks';

export interface EquipmentAccordionProps {
  equipment: IEquipment;
  useProcessDataHook?: typeof useProcessData;
}
