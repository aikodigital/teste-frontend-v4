import { useMemo } from 'react'
import { EquipmentModelIconMap } from '../constants/equipmentModel'

export function useEquipmentIcon(equipmentName) {
  return useMemo(() => {
    return EquipmentModelIconMap[equipmentName] || null
  }, [equipmentName])
}
