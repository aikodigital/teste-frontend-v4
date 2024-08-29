/** Estado reativo para o modelo selecionado */
const selectedModel = ref<string>('');

/**
 * Composable para gerenciar o filtro de modelo
 * @returns {Object} - Objeto com o filtro de modelo
 */
export function useModelFilter() {
  return { selectedModel };
}
