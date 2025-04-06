import { computed } from 'vue'
import type { IEquipmentStateDefinition } from '@/types/equipment.types'

export function useEquipmentStateColor(stateId: string | null, states: IEquipmentStateDefinition[]) {
  const color = computed(() => {
    if (!stateId) return ''
    return states.find((s) => s.id === stateId)?.color ?? ''
  })

  return { color }
}