/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EquipmentModel,
  EquipmentPositionHistory,
  EquipmentStateHistory,
  Position,
} from "../types/dataInterfaces";
import { Equipment, EquipmentState } from "../types/sharedTypes";

export function getLatestPosition(
  positionHistory: EquipmentPositionHistory,
): Position | null {
  if (positionHistory.positions.length === 0) return null;
  return positionHistory.positions.reduce((latest, current) =>
    new Date(current.date) > new Date(latest.date) ? current : latest,
  );
}

export function getLatestState(
  stateHistory: EquipmentStateHistory,
  states: EquipmentState[],
): EquipmentState | null {
  if (stateHistory.states.length === 0) return null;
  const latestState = stateHistory.states.reduce((latest, current) =>
    new Date(current.date) > new Date(latest.date) ? current : latest,
  );
  return (
    states.find((state) => state.id === latestState.equipmentStateId) || null
  );
}

export function calculateProductivity(
  stateHistory: EquipmentStateHistory,
  operatingStateId: string,
): number {
  const totalHours = stateHistory.states.length;
  const operatingHours = stateHistory.states.filter(
    (state) => state.equipmentStateId === operatingStateId,
  ).length;
  return (operatingHours / totalHours) * 100;
}

export function calculateEarnings(
  stateHistory: EquipmentStateHistory,
  equipmentModel: EquipmentModel,
): number {
  return stateHistory.states.reduce((total, state) => {
    const hourlyEarning = equipmentModel.hourlyEarnings.find(
      (earning) => earning.equipmentStateId === state.equipmentStateId,
    );
    return total + (hourlyEarning ? hourlyEarning.value : 0);
  }, 0);
}

export function getEquipmentDetails(
  equipment: any,
  models: any[],
  states: any[],
  positionHistories: any[],
  stateHistories: any[],
): Equipment | null {
  const model = models.find((m) => m.id === equipment.equipmentModelId);
  const positionHistory = positionHistories.find(
    (ph) => ph.equipmentId === equipment.id,
  );
  const stateHistory = stateHistories.find(
    (sh) => sh.equipmentId === equipment.id,
  );

  if (!model || !positionHistory || !stateHistory) return null;

  const latestPosition = getLatestPosition(positionHistory);
  const latestState = getLatestState(stateHistory, states);
  const productivity = calculateProductivity(
    stateHistory,
    states.find((s) => s.name === "Operando")?.id || "",
  );
  const earnings = calculateEarnings(stateHistory, model);

  return {
    ...equipment,
    model: model.name,
    latestPosition,
    latestState,
    productivity,
    earnings,
    stateHistory: stateHistory.states,
  };
}
