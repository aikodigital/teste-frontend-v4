import {
  IFullEquipment,
  IFullEquipmentModel,
  TFullHourlyEarnings
} from '../interfaces/fullEquipment.interface'

import { useEquipmentModels } from '../infra/query/useEquipmentModels'
import { useEquipment } from '../infra/query/useEquipments'
import { useEquipmentState } from '../infra/query/useEquipmentState'
import { useEquipmentWithLastPositions } from '../infra/query/useEquipmentLastPositions'

type TUseEquipmentsResponse = {
  isLoading: boolean
  data: IFullEquipment[]
}

export const useEquipments = (): TUseEquipmentsResponse => {
  const { data: equipments } = useEquipment()
  const { data: equipmentsModels } = useEquipmentModels()
  const { data: equipmentsState } = useEquipmentState()
  const { data: equipmentWithLastPosition } = useEquipmentWithLastPositions()

  if (
    !equipments ||
    !equipmentsModels ||
    !equipmentsState ||
    !equipmentWithLastPosition
  ) {
    return { isLoading: true, data: [] }
  }

  const equipmentsWithModels = equipments.reduce((acc, equipment) => {
    const equipmentModel = equipmentsModels.find(
      (model) => model.id === equipment.equipmentModelId
    )
    const equipmentPosition = equipmentWithLastPosition.find(
      (e) => e.equipmentId === equipment.id
    )

    if (!equipmentModel || !equipmentPosition) {
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
