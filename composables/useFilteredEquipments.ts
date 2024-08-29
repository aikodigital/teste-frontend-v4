/**
 * Composable para filtrar os equipamentos com base no estado e modelo selecionados
 * @returns {Object} - Objeto contendo os equipamentos filtrados
 */
export function useFilteredEquipments() {
  const { recentEquipments } = useEquipments();
  const { selectedState, selectedModel } = useEquipmentFilter();

  const filteredEquipments = computed(() => {
    return recentEquipments.value
      .filter((equipment) => !selectedState.value || equipment.currentState === selectedState.value)
      .filter((equipment) => !selectedModel.value || equipment.model?.name === selectedModel.value);
  });

  return { filteredEquipments };
}