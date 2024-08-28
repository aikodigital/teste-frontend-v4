const selectedState = ref<string>('');
const selectedModel = ref<string>('');

export function useEquipmentFilter() {
  return { selectedModel, selectedState };
}
