import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '../../constants/queryKeys'

import { IEquipmentStateHistory } from '../../interfaces/equipmentStateHistory.interface'
import {
  IEquipmentState,
  TFullState
} from '../../interfaces/equipmentState.interface'

import { getEquipmentStates } from './useEquipmentState'

import equipmentStateHistory from '../../../../data/equipmentStateHistory.json'

const getEquipmentsLastState = (id: string) => {
  const equipmentStates = getEquipmentStates()

  const states: IEquipmentStateHistory[] = JSON.parse(
    JSON.stringify(equipmentStateHistory)
  )

  const equipmentLastStates = states.find((s) => s.equipmentId === id)

  const lastStates = equipmentLastStates?.states
    .map((state) => ({
      date: new Date(state.date).toLocaleString(),
      state: equipmentStates.find(
        (s: IEquipmentState) => s.id === state.equipmentStateId
      )
    }))
    .reverse()

  return lastStates
}

export const useEquipmentLastStates = (
  id: string
): UseQueryResult<TFullState[]> => {
  return useQuery({
    queryKey: [QUERY_KEYS.EQUIPMENT_LAST_STATES],
    queryFn: () => getEquipmentsLastState(id)
  })
}
