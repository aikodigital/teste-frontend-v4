import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@constants/queryKeys'

import { IEquipmentStateHistory } from '@interfaces/equipmentStateHistory.interface'

import equipmentStateHistory from '@data/equipmentStateHistory.json'

const getEquipmentsLastState = () => {
  const equipmentsWithPositions: IEquipmentStateHistory[] = JSON.parse(
    JSON.stringify(equipmentStateHistory)
  )

  const equipmentsWithLastPosition = equipmentsWithPositions.reduce(
    (acc, equipment) => {
      const lastState = equipment.states.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0]

      acc.push({
        equipmentId: equipment.equipmentId,
        states: [lastState]
      })

      return acc
    },
    [] as IEquipmentStateHistory[]
  )

  return equipmentsWithLastPosition
}

export const useEquipmentsLastState = (): UseQueryResult<
  IEquipmentStateHistory[]
> =>
  useQuery({
    queryKey: [QUERY_KEYS.EQUIPMENTS_WITH_LAST_STATE],
    queryFn: getEquipmentsLastState
  })
