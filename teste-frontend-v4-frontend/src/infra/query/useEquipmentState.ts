import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '../../constants/queryKeys'

import { IEquipmentState } from '../../interfaces/equipmentState.interface'

import EquipmentState from '../../../../data/equipmentState.json'

const getEquipmentState = () => JSON.parse(JSON.stringify(EquipmentState))

export const useEquipmentState = (): UseQueryResult<IEquipmentState[]> =>
  useQuery({
    queryKey: [QUERY_KEYS.EQUIPMENT_STATE],
    queryFn: getEquipmentState
  })
