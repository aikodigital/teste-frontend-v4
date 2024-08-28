type ViewOptions = 'equipment' | 'stateHistory';

const currentView = ref<ViewOptions>('equipment');

export function useView() {
  function setView(view: ViewOptions) {
    currentView.value = view;
  }

  return { currentView, setView };
}
