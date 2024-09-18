export async function getEquipments() {
  const equipments = (await import('../data/equipment.json')).default
  const equipmentPositions = (await import('../data/equipmentPositionHistory.json')).default
  const equipmentStateHistory = (await import('../data/equipmentStateHistory.json')).default
  const equipmentState = (await import('../data/equipmentState.json')).default
  const equipmentModel = (await import('../data/equipmentModel.json')).default

  return { equipments, equipmentPositions, equipmentStateHistory, equipmentState, equipmentModel }
}