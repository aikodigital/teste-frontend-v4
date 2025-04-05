import { EquipmentDetailsHook } from '~/hooks/use-equipment-details';
import { EquipmentsHook } from '~/hooks/use-equipments.hook';

export interface AikoEquipmentsProperties
  extends EquipmentDetailsHook,
    EquipmentsHook {}
