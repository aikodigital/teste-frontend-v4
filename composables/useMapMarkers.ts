import { EquipmentStore } from '@/stores/equipment'
export function useMapMarkers(store: EquipmentStore) {
  function getLatLng(equipmentId: string) {
    const position = store.getLatestPosition(equipmentId)
    return position ? [position.lat, position.lon] : [0, 0]
  }

  return {
    getLatLng
  }
}