import { EquipmentFactory } from "@factories"
import type { EquipmentsState } from "@dtos/EquipmentState"

export default defineEventHandler(async (): Promise<EquipmentsState> => {
  const equipmentProvider = EquipmentFactory.createService()
  try {
    const equipmentsState = await equipmentProvider.getEquipmentsState()

    return equipmentsState
  } catch (error) {
    throw new Error(`Error get equipment states: ${error}`)
  }
})