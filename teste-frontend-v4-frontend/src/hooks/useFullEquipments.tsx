import {
  IFullEquipment,
  IFullEquipmentModel,
  TFullHourlyEarnings
} from '../interfaces/fullEquipment.interface'

import { useEquipmentModels } from '../infra/query/useEquipmentModels'
import { useEquipments } from '../infra/query/useEquipments'
import { useEquipmentStates } from '../infra/query/useEquipmentState'
import { useEquipmentsWithLastPosition } from '../infra/query/useEquipmentsLastPositions'
import { useEquipmentsLastState } from '../infra/query/useEquipmentsLastState'

type TUseEquipmentsResponse = {
  isLoading: boolean
  data: IFullEquipment[]
}

export const useFullEquipments = (): TUseEquipmentsResponse => {
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
    const equipmentPosition = equipmentsWithLastPosition.find(
      (e) => e.equipmentId === equipment.id
    )
    const equipmentState = equipmentsLastState.find(
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
