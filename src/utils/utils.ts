// src/utils/utils.ts

export type EquipmentStateHistory = {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
};

export const calculateProductivity = (
  stateHistory: EquipmentStateHistory,
  operatingStateId: string
): number => {
  if (!stateHistory || !stateHistory.states.length) return 0;

  const sortedStates = [...stateHistory.states].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let totalOperatingTimeMs = 0;
  const now = new Date();

  for (let i = 0; i < sortedStates.length; i++) {
    const current = sortedStates[i];
    const next = sortedStates[i + 1] || { date: now.toISOString() };

    const currentDate = new Date(current.date);
    const nextDate = new Date(next.date);
    const diff = nextDate.getTime() - currentDate.getTime();

    if (current.equipmentStateId === operatingStateId) {
      totalOperatingTimeMs += diff;
    }
  }

  const totalHours = totalOperatingTimeMs / (1000 * 60 * 60);
  return Math.round((totalHours / 24) * 100);
};
