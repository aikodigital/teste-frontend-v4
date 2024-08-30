type ViewOptions = 'equipment' | 'stateHistory' | 'percentage';

/** Estado reativo para a visualização atual */
const currentView = ref<ViewOptions>('equipment');


/**
 * Composable para gerenciar a visualização atual
 * @returns {Object} - Objeto com a visualização atual e método para alterá-la
 */
export function useView() {
  function setView(view: ViewOptions) {
    currentView.value = view;
  }

  return { currentView, setView };
}
