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