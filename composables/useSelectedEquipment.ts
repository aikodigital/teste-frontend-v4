/** Interfaces */
import type { IEquipmentDetails } from '~/interfaces/equipment';

const selectedEquipment = ref<IEquipmentDetails | null>(null);

export function useSelectedEquipment() {
  function setSelectedEquipment(equipment: IEquipmentDetails | null) {
    selectedEquipment.value = equipment;
  }

  return { selectedEquipment, setSelectedEquipment };
}
