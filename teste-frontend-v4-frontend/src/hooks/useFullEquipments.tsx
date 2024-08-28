import {
  IFullEquipment,
  IFullEquipmentModel,
  TFullHourlyEarnings
} from '@interfaces/fullEquipment.interface'

import { useEquipmentModels } from '@query/useEquipmentModels'
import { useEquipments } from '@query/useEquipments'
import { useEquipmentStates } from '@query/useEquipmentState'
import { useEquipmentsWithLastPosition } from '@query/useEquipmentsLastPosition'
import { useEquipmentsLastState } from '@query/useEquipmentsLastState'

type TUseEquipmentsResponse = {
  isLoading: boolean
  data: IFullEquipment[]
}

export const useFullEquipments = (
  model?: string,
  state?: string
): TUseEquipmentsResponse => {
  const { data: equipments } = useEquipments()
  const { data: equipmentModels } = useEquipmentModels()
  const { data: equipmentsState } = useEquipmentStates()
  const { data: equipmentsWithLastPosition } = useEquipmentsWithLastPosition()
  const { data: equipmentsLastState } = useEquipmentsLastState()

  if (
    !equipments ||
    !equipmentModels ||
    !equipmentsState ||
    !equipmentsWithLastPosition ||
    !equipmentsLastState
  ) {
    return { isLoading: true, data: [] }
  }

  const equipmentsWithModels = equipments.reduce((acc, equipment) => {
    const equipmentModel = equipmentModels.find(
      (model) => model.id === equipment.equipmentModelId
    )
    if (model && model !== equipmentModel?.id) {
      return acc
    }

    const equipmentState = equipmentsLastState.find(
      (e) => e.equipmentId === equipment.id
    )
    if (state && state !== equipmentState?.states[0].equipmentStateId) {
      return acc
    }

    const equipmentPosition = equipmentsWithLastPosition.find(
      (e) => e.equipmentId === equipment.id
    )

    const actualState = equipmentsState.find(
      (s) => s.id === equipmentState?.states[0].equipmentStateId
    )

    if (
      !equipmentModel ||
      !equipmentPosition ||
      !equipmentState ||
      !actualState
    ) {
      return acc
    }

    const hourlyEarnings: TFullHourlyEarnings[] =
      equipmentModel.hourlyEarnings.reduce((acc, hourly) => {
        const state = equipmentsState.find(
          (state) => state.id === hourly.equipmentStateId
        )
        if (!state) {
          return acc
        }

        acc.push({
          ...hourly,
          state
        })

        return acc
      }, [] as TFullHourlyEarnings[])

    const equipmentModelWithStates: IFullEquipmentModel = {
      ...equipmentModel,
      hourlyEarnings
    }

    const fullEquipment: IFullEquipment = {
      ...equipment,
      equipmentModel: equipmentModelWithStates,
      state: actualState,
      position: {
        lat: equipmentPosition.position.lat,
        lng: equipmentPosition.position.lon
      }
    }

    acc.push(fullEquipment)

    return acc
  }, [] as IFullEquipment[])

  return {
    isLoading: false,
    data: equipmentsWithModels
  }
}
