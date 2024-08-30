/** Estado reativo para armazenar o filtro de equipamentos */
const selectedState = ref<string>('');
const selectedModel = ref<string>('');

/**
 * Composable para gerenciar os filtros de equipamentos
 * @returns {Object} - Objeto com os filtros de equipamentos
 */
export function useEquipmentFilter() {
  return { selectedModel, selectedState };
}
