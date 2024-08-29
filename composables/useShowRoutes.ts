/** Interfaces */
import type { IEquipmentDetails } from '~/interfaces/IEquipmentDetails';

const positionsToShow = ref<Map<string, { lat: number, lon: number }[]>>(new Map());

watch(positionsToShow, (newValue) => {
  console.log('positionsToShow', newValue.values());
}, { deep: true });

function addRoute(equipment: IEquipmentDetails) {
  const equipmentPositions = getEquipmentPositionHistory(equipment);
  positionsToShow.value.set(equipment.id, equipmentPositions);
}

function removeRoute(equipmentId: string) {
  positionsToShow.value.delete(equipmentId);
}

function hasRoute(equipmentId: string) {
  return positionsToShow.value.has(equipmentId);
}

function toggleRoute(equipment: IEquipmentDetails) {
  if (hasRoute(equipment.id)) {
    removeRoute(equipment.id);
  } else {
    addRoute(equipment);
  }
}

export function useShowRoutes() {
  return { positionsToShow, addRoute, removeRoute, toggleRoute, hasRoute };
}