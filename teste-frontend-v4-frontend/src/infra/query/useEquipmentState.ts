import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '../../constants/queryKeys'

import { IEquipmentState } from '../../interfaces/equipmentState.interface'

import EquipmentState from '../../../../data/equipmentState.json'

export const getEquipmentStates = () =>
  JSON.parse(JSON.stringify(EquipmentState))

export const useEquipmentStates = (): UseQueryResult<IEquipmentState[]> =>
  useQuery({
    queryKey: [QUERY_KEYS.EQUIPMENT_STATES],
    queryFn: getEquipmentStates
  })
