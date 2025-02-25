import type { EquipmentStateHistory } from "@dtos/EquipmentStateHistory";
import type { EquipmentsState } from "@dtos/EquipmentState";

export const calculateTimePerState = (equipmentHistory: EquipmentStateHistory) => {
  const stateDurations: Record<string, number> = {};

  if (equipmentHistory.states.length < 2) return stateDurations;

  const sortedStates = equipmentHistory.states.sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  for (let i = 0; i < sortedStates.length - 1; i++) {
    const current = sortedStates[i];
    const next = sortedStates[i + 1];

    const duration = (new Date(next.date).getTime() - new Date(current.date).getTime()) / (1000 * 60 * 60);

    if (!stateDurations[current.equipmentStateId]) {
      stateDurations[current.equipmentStateId] = 0;
    }
    stateDurations[current.equipmentStateId] += duration;
  }

  return stateDurations;
};

export const displayStateDurations = (stateDurations: Record<string, number>, equipmentsState: EquipmentsState) => {
  return Object.entries(stateDurations).map(([stateId, duration]) => {
    const state = equipmentsState.find((s) => s.id === stateId);
    return {
      name: state?.name || "Desconhecido",
      color: state?.color || "#000",
      duration: duration + " horas"
    };
  });
};