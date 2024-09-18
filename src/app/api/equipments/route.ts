import data from '../../../../data/equipment.json'
import dataModels from '../../../../data/equipmentModel.json'
import statesTypes from '../../../../data/equipmentState.json'
import activeStates from '../../../../data/equipmentStateHistory.json'

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const getEquipments = data.filter(equipment => equipment.id)

  const mergedEquipments = getEquipments.map(equipment => {
    // Buscar nome do modelo
    const model = dataModels.find(
      model => model.id === equipment.equipmentModelId
    )
    // Buscar status atual do equipamento
    const modelState = activeStates.find(
      modelState => modelState.equipmentId === equipment.id
    )
    // Buscar ultimo id do array de status
    const lastEquipmentId = modelState?.states[modelState.states.length - 1]
    // Buscar nome do estado atual do equipamento a partir do id do ultimo elemento no array
    const labelState = statesTypes.find(
      label => label.id === (lastEquipmentId?.equipmentStateId ?? '')
    )
    return {
      ...equipment,
      modelName: model ? model.name : 'Unknown Model',
      activeState: labelState?.name
    }
  })

  return Response.json(mergedEquipments)
}
