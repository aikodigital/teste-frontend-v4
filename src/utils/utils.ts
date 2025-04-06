import type { IEquipment, IEquipmentModel, IEquipmentPositionHistory, IEquipmentStateDefinition, IEquipmentStateHistory, IEquipmentSummary } from '@/types/equipment.types'

function normalizeIsoDate(isoDate: string): string {
  const date = new Date(isoDate)

  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}


function normalizeModelName(modelId: string, equipmentList: IEquipmentModel[]): string {
  const model = equipmentList.find(item => item.id === modelId)
  return model ? model.name : '-'
}

function normalizeStateName(stateId: string, stateList: IEquipmentStateDefinition[]): string {
  const state = stateList.find(item => item.id === stateId)
  return state ? state.name : '-'
}

function getStateColor(stateId: string, stateList: IEquipmentStateDefinition[]): string {
  const state = stateList.find(item => item.id === stateId)
  return state ? state.color : '-'
}

function getEquipmentSummary(
  equipments: IEquipment[],
  models: IEquipmentModel[],
  states: IEquipmentStateDefinition[],
  positionsHistory: IEquipmentPositionHistory[],
  stateHistory: IEquipmentStateHistory[]
): IEquipmentSummary[] {
  return equipments.map(equipment => {
    const model = models.find(m => m.id === equipment.equipmentModelId);
    const positionData = positionsHistory.find(p => p.equipmentId === equipment.id);
    const stateData = stateHistory.find(s => s.equipmentId === equipment.id);

    const lastPosition = positionData?.positions?.length
      ? [...positionData.positions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
      : null;

    const sortedStates = stateData?.states?.length
      ? [...stateData.states].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      : []

    const lastState = sortedStates[0] ?? null

    const stateInfo = lastState
      ? states.find(state => state.id === lastState.equipmentStateId)
      : null;

    const recentStates = sortedStates.slice(0, 4).map(state => {
      const stateDef = states.find(s => s.id === state.equipmentStateId)
      return {
        name: stateDef?.name ?? null,
        color: stateDef?.color ?? null,
        date: state.date
      }
    })

    return {
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      modelName: model?.name ?? null,
      lastStateName: stateInfo?.name ?? null,
      lastStateColor: stateInfo?.color ?? null,
      lastStateDate: lastState?.date ?? null,
      lastPosition: lastPosition ? { lat: lastPosition.lat, lon: lastPosition.lon } : null,
      lastPositionDate: lastPosition?.date ?? null,
      recentStates
    };
  });
}

export {
  normalizeIsoDate,
  normalizeModelName,
  normalizeStateName,
  getStateColor,
  getEquipmentSummary
}