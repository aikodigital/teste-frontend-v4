import { ref, computed } from 'vue'

const colors = ['#2ecc71', '#e74c3c', '#f1c40f']
const iconCache = new Map()

export function useMapIcons() {
  const iconWidth = ref(28)
  const iconHeight = ref(30)
  const iconSize = computed(() => [iconWidth.value, iconHeight.value])

  function getIconUrl(equipmentId: string) {
    if (!iconCache.has(equipmentId)) {
      const color = colors[iconCache.size % colors.length]
      const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${iconWidth.value}" height="${iconHeight.value}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="2" x2="5" y1="12" y2="12"/>
          <line x1="19" x2="22" y1="12" y2="12"/>
          <line x1="12" x2="12" y1="2" y2="5"/>
          <line x1="12" x2="12" y1="19" y2="22"/>
          <circle cx="12" cy="12" r="7"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      `
      const blob = new Blob([svgIcon], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      iconCache.set(equipmentId, url)
    }
    return iconCache.get(equipmentId)
  }

  return {
    iconSize,
    getIconUrl
  }
}