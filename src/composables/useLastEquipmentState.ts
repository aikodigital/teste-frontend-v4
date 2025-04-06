import { computed } from 'vue'
import type { IEquipmentStateHistory } from '@/types/equipment.types'

export function useLastEquipmentState(stateHistory: IEquipmentStateHistory[]) {
  const lastState = computed(() => {
    const states = stateHistory[0]?.states || []
    return states.length > 0 ? states[states.length - 1] : null
  })

  return { lastState }
}