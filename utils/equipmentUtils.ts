/** Core */
import type { PointExpression } from 'leaflet';

/** Data */
import { equipmentModelData, equipmentStateData } from '~/data/equipment';

/** Interfaces */
import type {
  IEquipment,
  IEquipmentDetails,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory
} from '~/interfaces/equipment';

export function getCurrentStateClass(state: string) {
  return state === 'Operando' ? 'text-operando'
    : state === 'Parado' ? 'text-parado'
      : 'text-manutencao';
}

function getModel(equipment: IEquipment, equipmentsModel: IEquipmentModel[]) {
  return equipmentsModel.find((model) => model.id === equipment.equipmentModelId);
}

function getPositionHistory(equipment: IEquipment, equipmentsPositionHistory: IEquipmentPositionHistory[]) {
  return equipmentsPositionHistory.find((positionHistory) => positionHistory.equipmentId === equipment.id)?.positions || [];
}

function getStateHistory(equipment: IEquipment, equipmentsStateHistory: IEquipmentStateHistory[], equipmentStates: IEquipmentState[]) {
  const stateHistory = equipmentsStateHistory.find((stateHistory) => stateHistory.equipmentId === equipment.id)?.states || [];
  return stateHistory.map((state) => {
    const stateName = equipmentStates.find((equipmentState) => equipmentState.id === state.equipmentStateId)?.name;

    return {
      date: state.date,
      name: stateName || 'Desconhecido',
    };
  });
}

function getCurrentPosition(positionHistory: { lat: number; lon: number }[]) {
  return positionHistory.at(-1)!;
}

function getCurrentState(stateHistory: { date: string; name: string }[]) {
  return stateHistory.at(-1)!.name;
}

export function getEquipmentDetails(
  equipments: IEquipment[],
  equipmentsModel: IEquipmentModel[],
  equipmentsPositionHistory: IEquipmentPositionHistory[],
  equipmentsStateHistory: IEquipmentStateHistory[],
  equipmentStates: IEquipmentState[]
): IEquipmentDetails[] {
  return equipments.map((equipment) => {
    const model = getModel(equipment, equipmentsModel);
    const positionHistory = getPositionHistory(equipment, equipmentsPositionHistory);
    const stateHistory = getStateHistory(equipment, equipmentsStateHistory, equipmentStates);
    const currentPosition = getCurrentPosition(positionHistory);
    const currentState = getCurrentState(stateHistory);

    return {
      id: equipment.id,
      name: equipment.name,
      model,
      currentState,
      stateHistory,
      currentPosition,
      positionHistory,
    };
  });
}

export function getEquipmentsRecentPosition(equipments: IEquipmentDetails[]): { lat: number; lon: number }[] {
  return equipments.map((equipment) => ({
    lat: equipment.currentPosition.lat,
    lon: equipment.currentPosition.lon,
  }));
}

export function getCentralPosition(positions: { lat: number; lon: number }[]): PointExpression {
  const total = positions.length;

  const sum = positions.reduce((acc, position) => {
    acc.lat += position.lat;
    acc.lon += position.lon;

    return acc;
  }, { lat: 0, lon: 0 });

  return [
    sum.lat / total,
    sum.lon / total,
  ];
}

export function getZoomLevel(positions: { lat: number; lon: number }[]) {
  if (positions.length === 0) {
    return 2;
  }

  const latitudes = positions.map((position) => position.lat);
  const longitudes = positions.map((position) => position.lon);

  const latDiff = Math.max(...latitudes) - Math.min(...latitudes);
  const lonDiff = Math.max(...longitudes) - Math.min(...longitudes);
  const maxDiff = Math.max(latDiff, lonDiff);

  if (maxDiff < 0.01) {
    return 15;
  }

  if (maxDiff < 0.1) {
    return 14;
  }

  if (maxDiff < 0.5) {
    return 10;
  }

  if (maxDiff < 0.7) {
    return 8;
  }

  return 2;
}

export function getStates() {
  return equipmentStateData.map((state) => state.name);
}

export function getModels() {
  return equipmentModelData.map((model) => model.name);
}
