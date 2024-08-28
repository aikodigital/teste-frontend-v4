import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@constants/queryKeys'

import {
  IEquipmentPositionHistory,
  TPosition
} from '@interfaces/equipmentPositionHistory.interface'

import PositionHistory from '@data/equipmentPositionHistory.json'

const getEquipmentLastPositions = (id: string): TPosition[] => {
  const equipmentsWithPositions: IEquipmentPositionHistory[] = JSON.parse(
    JSON.stringify(PositionHistory)
  )

  const equipmentWithLastPositions =
    equipmentsWithPositions.find((e) => e.equipmentId === id)?.positions || []

  return equipmentWithLastPositions.reverse()
}

export const useEquipmentLastPositions = (
  id: string
): UseQueryResult<TPosition[]> =>
  useQuery({
    queryKey: [QUERY_KEYS.EQUIPMENT_LAST_POSITIONS, id],
    queryFn: () => getEquipmentLastPositions(id)
  })
