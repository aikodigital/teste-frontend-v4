import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@constants/queryKeys'

import { IEquipment } from '@interfaces/equipment.interface'

import Equipment from '@data/equipment.json'

const getEquipments = () => JSON.parse(JSON.stringify(Equipment))

export const useEquipments = (): UseQueryResult<IEquipment[]> =>
  useQuery({
    queryKey: [QUERY_KEYS.EQUIPMENTS],
    queryFn: getEquipments
  })
