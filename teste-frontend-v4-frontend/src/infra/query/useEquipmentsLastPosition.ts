import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@constants/queryKeys'

import {
  IEquipmentLastPositionHistory,
  IEquipmentPositionHistory
} from '@interfaces/equipmentPositionHistory.interface'

import PositionHistory from '@data/equipmentPositionHistory.json'

const getEquipmentsWithLastPosition = () => {
  const equipmentsWithPositions: IEquipmentPositionHistory[] = JSON.parse(
    JSON.stringify(PositionHistory)
  )

  const equipmentsWithLastPosition = equipmentsWithPositions.reduce(
    (acc, equipment) => {
      const position = equipment.positions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0]

      acc.push({
        equipmentId: equipment.equipmentId,
        position: {
          lat: position.lat,
          lon: position.lon
        }
      })

      return acc
    },
    [] as IEquipmentLastPositionHistory[]
  )

  return equipmentsWithLastPosition
}

export const useEquipmentsWithLastPosition = (): UseQueryResult<
  IEquipmentLastPositionHistory[]
> =>
  useQuery({
    queryKey: [QUERY_KEYS.EQUIPMENTS_LAST_POSITION],
    queryFn: getEquipmentsWithLastPosition
  })
