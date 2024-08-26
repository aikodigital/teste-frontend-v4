import { useEquipment } from '@/hooks';

import { SelectOption } from '@/@types';

export interface DashboardProps {
  useEquipmentHook?: typeof useEquipment;
}

export interface FiltersProps {
  equipmentName: string | undefined;
  equipmentState: SelectOption | null;
  equipmentModel: SelectOption | null;
}
