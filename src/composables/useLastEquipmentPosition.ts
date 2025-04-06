import { computed } from 'vue'
import type { IEquipmentPositionHistory } from '@/types/equipment.types'

export function useLastEquipmentPosition(positionHistory: IEquipmentPositionHistory[]) {
  const lastPosition = computed(() => {
    const positions = positionHistory[0]?.positions || []
    return positions.length > 0 ? positions[positions.length - 1] : null
  })

  return { lastPosition }
}