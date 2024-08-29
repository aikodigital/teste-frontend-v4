/** Core */
import type { PointExpression } from 'leaflet';

/** Data */
import { equipmentModelData, equipmentStateData, equipmentStateHistoryData } from '~/data/equipment';

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


type EquipmentStatesOnSameDay = Record<string, { hour: string, stateName: string }[]>;
interface EquipmentDailyStateHours {
  [date: string]: {
    percentages: Record<string, number>;
    hours: Record<string, number>;
    totalEarnings: number;
  }
}

function getModel(equipment: IEquipment, equipmentsModel: IEquipmentModel[]) {
  return equipmentsModel.find((model) => model.id === equipment.equipmentModelId);
}

function getPositionHistory(equipment: IEquipment, equipmentsPositionHistory: IEquipmentPositionHistory[]) {
  return equipmentsPositionHistory.find((positionHistory) => positionHistory.equipmentId === equipment.id)?.positions || [];
}

function getStateHistory(equipment: IEquipment, equipmentsStateHistory: IEquipmentStateHistory[], equipmentStates: IEquipmentState[]) {
  const stateHistoryMap = new Map((equipmentsStateHistory.map((stateHistory) => [stateHistory.equipmentId, stateHistory.states])));
  const stateNameMap = new Map(equipmentStates.map((state) => [state.id, state.name]));

  const stateHistory = stateHistoryMap.get(equipment.id) || [];

  return stateHistory.map((state) => {
    const stateName = stateNameMap.get(state.equipmentStateId) || 'Desconhecido';

    return { date: state.date, name: stateName };
  });
}

function getCurrentPosition(positionHistory: { lat: number; lon: number }[]) {
  return positionHistory.at(-1)!;
}

function getCurrentState(stateHistory: { date: string; name: string }[]) {
  return stateHistory.at(-1)!.name;
}

function convertObjectToArray(dailyStateHours: EquipmentDailyStateHours) {
  return Object.entries(dailyStateHours).map(([date, value]) => {
    return {
      date,
      hours: Object.entries(value.hours).map(([stateName, hour]) => ({ stateName, hour })),
      percentages: Object.entries(value.percentages).map(([stateName, percentage]) => ({ stateName, percentage })),
      totalEarnings: value.totalEarnings,
    };
  });
}

function customSort(a: IEquipmentState['name'], b: IEquipmentState['name']) {
  const stateOrder: IEquipmentState['name'][] = ['Operando', 'Manutenção', 'Parado', 'Desconhecido'];

  const indexA = stateOrder.indexOf(a);
  const indexB = stateOrder.indexOf(b);

  return indexA - indexB;
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

export function getDailyReport(equipment: IEquipmentDetails) {
  const equipmentStateHistory = equipmentStateHistoryData.find((stateHistory) => stateHistory.equipmentId === equipment.id)?.states || [];
  const stateNameMap = new Map(equipmentStateData.map((state) => [state.id, state.name]));

  const hourlyEarnings = equipmentModelData.find((model) => model.id === equipment.model!.id)?.hourlyEarnings;
  const hourlyEarningsWithStateNames = hourlyEarnings!.map((hourlyEarning) => {
    const stateName = stateNameMap.get(hourlyEarning.equipmentStateId) || 'Desconhecido';
    return { stateName, value: hourlyEarning.value };
  });

  const statesOnSameDay: EquipmentStatesOnSameDay = {};

  for (let i = 0; i < equipmentStateHistory.length; i++) {
    const state = equipmentStateHistory[i];
    const [date, hour] = state.date.split('T');

    const stateName = stateNameMap.get(state.equipmentStateId) || 'Desconhecido';

    if (!statesOnSameDay[date]) {
      statesOnSameDay[date] = [];
    }

    statesOnSameDay[date].push({ hour, stateName });
  }

  const dailyStateHours: EquipmentDailyStateHours = {};
  let lastStateOfPreviousDay: { hour: string, stateName: string } = {
    hour: '00:00:00.000Z',
    stateName: 'Desconhecido',
  };

  for (const [day, states] of Object.entries(statesOnSameDay)) {
    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      const nextState = states[i + 1] || { hour: '24:00:00.000Z', stateName: state.stateName };

      const [hour] = state.hour.split(':');
      const [nextHour] = nextState.hour.split(':');

      if (!dailyStateHours[day]) {
        dailyStateHours[day] = { totalEarnings: 0, hours: {}, percentages: {} };
      }

      if (!dailyStateHours[day].hours[state.stateName]) {
        dailyStateHours[day].hours[state.stateName] = 0;
      }

      dailyStateHours[day].hours[state.stateName] += Number(nextHour) - Number(hour);

      if (i === 0 && lastStateOfPreviousDay) {
        dailyStateHours[day].hours[lastStateOfPreviousDay.stateName] = Number(hour);
      } else if (i === states.length - 1) {
        lastStateOfPreviousDay = state;
      }
    }

    const { hours } = dailyStateHours[day];
    for (const [state, hour] of Object.entries(hours)) {
      dailyStateHours[day].percentages[state] = parseFloat(((hour / 24) * 100).toFixed(2));

      if (state !== 'Desconhecido') {
        dailyStateHours[day].totalEarnings += hourlyEarningsWithStateNames.find((hourlyEarning) => hourlyEarning.stateName === state)?.value! * hour;
      }
    }
  }

  const arrayOfDailyStateHoursReversed = convertObjectToArray(dailyStateHours).reverse();
  for (const day of arrayOfDailyStateHoursReversed) {
    day.hours.sort((a, b) => customSort(a.stateName, b.stateName));
    day.percentages.sort((a, b) => customSort(a.stateName, b.stateName));
  }

  return arrayOfDailyStateHoursReversed;
}

export function getIconModel(equipmentModelName?: string) {
  switch (equipmentModelName) {
    case 'Caminhão de carga':
      return 'fa6-solid:truck';
    case 'Harvester':
      return 'fa6-solid:tractor';
    case 'Garra traçadora':
      return 'fa6-solid:truck-monster';
    default:
      return 'fa6-solid:question';
  }
}
