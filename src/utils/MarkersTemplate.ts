import type { EquipmentData } from '@/types/EquipmentTypes'
import { h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import MapMarkerIcon from '@/components/MapMarkerIcon.vue'
import MapPopup from '@/components/MapPopup.vue'

export const markerIcon = async (equipments: EquipmentData, effect?: boolean): Promise<string> => {
  const iconTemplate = h(MapMarkerIcon, {
    equipments: equipments,
    effect: effect
  })
  return await renderToString(iconTemplate)
}

export const markerPopup = async (equipments: EquipmentData, effect?: boolean): Promise<string> => {
  const popupTemplate = h(MapPopup, {
    equipments: equipments,
    effect: effect
  })
  return await renderToString(popupTemplate)
}
