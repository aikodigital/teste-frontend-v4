/** Interfaces */
import type { IEquipmentDetails } from '~/interfaces/equipment';

/** Estado reativo para o equipamento selecionado */
const selectedEquipment = ref<IEquipmentDetails | null>(null);

/**
 * Composable para gerenciar o equipamento selecionado
 * @returns {Object} - Objeto com o equipamento selecionado
 */
export function useSelectedEquipment() {
  function setSelectedEquipment(equipment: IEquipmentDetails | null) {
    selectedEquipment.value = equipment;
  }

  return { selectedEquipment, setSelectedEquipment };
}
