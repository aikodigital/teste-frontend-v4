import { useEquipmentsHook } from '~/hooks/use-equipments.hook';
import { AikoEquipmentsLayout } from './akio-equipments.layout';
import { useEquipmentDetails } from '~/hooks/use-equipment-details';

export const AikoEquipments = () => {
  const dataProperties = useEquipmentsHook();
  const detailsProperties = useEquipmentDetails();

  return <AikoEquipmentsLayout {...dataProperties} {...detailsProperties} />;
};
