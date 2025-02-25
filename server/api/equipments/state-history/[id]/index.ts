
import { EquipmentFactory } from "@factories"
import type { EquipmentStateHistory } from "@dtos/EquipmentStateHistory"

export default defineEventHandler(async (event): Promise<EquipmentStateHistory> => {
  const equipmentProvider = EquipmentFactory.createService()
  try {
    const id = event.context.params?.id

    if (!id) {
      throw new Error('Id not found')
    }

    const equipmentStateHistory = await equipmentProvider.getEquipmentsStateHistoryById(id)

    return equipmentStateHistory
  } catch (error) {
    throw new Error(`Error get equipment state history by id: ${error}`)
  }
})