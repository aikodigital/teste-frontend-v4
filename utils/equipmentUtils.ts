/** Core */
import type { PointExpression } from 'leaflet';

/** Interfaces */
import type {
  IEquipment,
  IEquipmentDetails,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory
} from '~/interfaces/equipment';

export function getCurrentStateClass(state: IEquipmentState) {
  return state.name === 'Operando' ? 'text-operando'
    : state.name === 'Parado' ? 'text-parado'
      : 'text-manutencao';
}

function getModel(equipment: IEquipment, equipmentsModel: IEquipmentModel[]) {
  return equipmentsModel.find((model) => model.id === equipment.equipmentModelId);
}

function getPositionHistory(equipment: IEquipment, equipmentsPositionHistory: IEquipmentPositionHistory[]) {
  return equipmentsPositionHistory.find((positionHistory) => positionHistory.equipmentId === equipment.id)?.positions || [];
}

function getStateHistory(equipment: IEquipment, equipmentsStateHistory: IEquipmentStateHistory[]) {
  return equipmentsStateHistory.find((stateHistory) => stateHistory.equipmentId === equipment.id)?.states || [];
}

function getCurrentPosition(positionHistory: { lat: number; lon: number }[]) {
  return positionHistory[positionHistory.length - 1];
}

function getCurrentState(stateHistory: { date: string; equipmentStateId: string }[], equipmentState: IEquipmentState[]) {
  const lastState = stateHistory[stateHistory.length - 1];

  return equipmentState.find((state) => state.id === lastState.equipmentStateId);
}

export function getEquipmentDetails(
  equipments: IEquipment[],
  equipmentsModel: IEquipmentModel[],
  equipmentsPositionHistory: IEquipmentPositionHistory[],
  equipmentsStateHistory: IEquipmentStateHistory[],
  equipmentState: IEquipmentState[]
): IEquipmentDetails[] {
  return equipments.map((equipment) => {
    const model = getModel(equipment, equipmentsModel);
    const positionHistory = getPositionHistory(equipment, equipmentsPositionHistory);
    const stateHistory = getStateHistory(equipment, equipmentsStateHistory);
    const currentPosition = getCurrentPosition(positionHistory);
    const currentState = getCurrentState(stateHistory, equipmentState);

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
