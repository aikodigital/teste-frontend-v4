import {
  IEquipmentState,
  IEquipmentStateHistory,
} from '../../../@types/equipment';
import equipmentStateJson from '../../../data/equipmentState.json';
import equipmentStateHistoryJson from '../../../data/equipmentStateHistory.json';
import { getModelById } from './equipmentModel';
import { getEquipmentById } from './equipment';

const equipmentState = equipmentStateJson as IEquipmentState[];
const equipmentsStateHistory =
  equipmentStateHistoryJson as IEquipmentStateHistory[];

function getStateId(stateName: string) {
  return equipmentState.find((state) => state.name === stateName)?.id;
}

function getStates() {
  return equipmentState.map((state) => state.name);
}

function getStateById(equipmentStateId: string) {
  return equipmentState.find((state) => state.id === equipmentStateId);
}

function getEquipmentLatestState(equipmentId: string) {
  const equipmentStateHistory = equipmentsStateHistory.find(
    (state) => state.equipmentId === equipmentId,
  );

  if (!equipmentStateHistory) return null;

  const latestState =
    equipmentStateHistory.states[equipmentStateHistory.states.length - 1];

  const latestStateInfos = getStateById(latestState.equipmentStateId);

  return {
    ...latestStateInfos,
    ...latestState,
  };
}

function getStateHistory(equipmentId: string) {
  const equipmentHistory = equipmentsStateHistory.find(
    (history) => history.equipmentId === equipmentId,
  );

  if (!equipmentHistory) return null;

  const states = equipmentHistory.states.map((state) => {
    const stateData = equipmentState.find(
      (equipmentState) => equipmentState.id === state.equipmentStateId,
    );

    return stateData
      ? {
          id: state.equipmentStateId,
          name: stateData.name,
          color: stateData.color,
          date: state.date,
        }
      : null;
  });

  return states;
}

function calculateTotalHours(equipmentId: string) {
  const states = getStateHistory(equipmentId);

  if (states?.length === 0) return 0;

  const sortedStates = states
    ?.map((state) => new Date(state?.date ?? ''))
    .sort((a, b) => a.getTime() - b.getTime());

  if (sortedStates) {
    const start = sortedStates[0].getTime();
    const end = sortedStates[sortedStates.length - 1].getTime();
    const differenceInHours = (end - start) / (1000 * 60 * 60);
    return differenceInHours;
  }

  return 0;
}

function calculateStateHours(
  equipmentId: string,
  targetStateId: string,
): number {
  const states = getStateHistory(equipmentId);

  if (states?.length === 0) return 0;

  const sortedStates = states
    ?.map((state) => ({
      ...state,
      date: new Date(state?.date ?? ''),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  let totalHours = 0;

  if (sortedStates) {
    let targetStateStart: number | null = null;

    for (let i = 0; i < sortedStates.length; i++) {
      const currentState = sortedStates[i];
      const currentTime = currentState.date.getTime();

      if (currentState.id === targetStateId) {
        if (targetStateStart !== null) {
          totalHours += (currentTime - targetStateStart) / (1000 * 60 * 60);
        }
        targetStateStart = currentTime;
      } else {
        if (targetStateStart !== null) {
          totalHours += (currentTime - targetStateStart) / (1000 * 60 * 60);
          targetStateStart = null;
        }
      }
    }
  }
  return totalHours;
}

function getProductivityPercentage(equipmentId: string): string {
  const operatingState = getStateId('Operando');
  if (!operatingState) return '0.00';

  const totalHours = calculateTotalHours(equipmentId);
  if (totalHours === 0) return '0.00';

  const operatingHours = calculateStateHours(equipmentId, operatingState);

  const operatingPercentage = ((operatingHours / totalHours) * 100).toFixed(2);

  return operatingPercentage;
}

function getGainPerEquipment(equipmentId: string) {
  const equipment = getEquipmentById(equipmentId);
  if (!equipment) return 0;

  const equipmentModel = getModelById(equipment.equipmentModelId);
  if (!equipmentModel) return 0;

  const states = {
    Operando: getStateId('Operando'),
    Parado: getStateId('Parado'),
    Manutenção: getStateId('Manutenção'),
  };

  const total = Object.entries(states).reduce((acc, [, stateId]) => {
    if (!stateId) return acc;

    const hours = calculateStateHours(equipmentId, stateId);
    const earning = equipmentModel.hourlyEarnings.find(
      (hourlyEarning) => hourlyEarning.equipmentStateId === stateId,
    );

    return acc + hours * (earning?.value ?? 0);
  }, 0);

  return total;
}

export {
  getStates,
  getStateById,
  getEquipmentLatestState,
  getStateHistory,
  getProductivityPercentage,
  getGainPerEquipment,
};
