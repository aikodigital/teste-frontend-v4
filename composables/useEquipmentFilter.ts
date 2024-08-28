const selectedState = ref<string>('');

export function useEquipmentFilter() {
  return { selectedState };
}
