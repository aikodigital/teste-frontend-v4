import { EquipmentFactory } from "@factories/EquipmentFactory";
import type { EquipmentResponse } from "@dtos/Equipment";

export default defineEventHandler(async (event): Promise<EquipmentResponse[]> => {
  const equipmentProvider = EquipmentFactory.createService()
  const query = getQuery(event)
  const stateFilter = query.state
  try {
    const equipments = await equipmentProvider.getEquipments()
    const equipmentsModel = await equipmentProvider.getEquipmentsModel()
    const equipmentsPositionHistory = await equipmentProvider.getEquipmentsPositionHistory()
    const equipmentsState = await equipmentProvider.getEquipmentsState()
    const equipmentsStateHistory = await equipmentProvider.getEquipmentsStateHistory()

    const lastEquipments = equipments.map((equipment) => {
      const lastStates = equipmentsStateHistory.find(stateHistory => stateHistory.equipmentId === equipment.id)?.states
      const lastPositions = equipmentsPositionHistory.find(position => position.equipmentId === equipment.id)?.positions

      const model = equipmentsModel.find(model => model.id === equipment.equipmentModelId)
      const state = equipmentsState.find((state) => state.id === lastStates?.[lastStates.length - 1]?.equipmentStateId)
      const position = lastPositions?.[lastPositions.length - 1]

      return {
        id: equipment.id,
        name: equipment.name,
        equipmentModelId: equipment.equipmentModelId,
        model,
        state,
        position
      }
    }).filter((equipment) => {
      return stateFilter ? equipment.state?.id === stateFilter : true;
    });

    return lastEquipments
  } catch (error) {
    throw new Error(`Error on get Equipments: ${error}`)
  }
});