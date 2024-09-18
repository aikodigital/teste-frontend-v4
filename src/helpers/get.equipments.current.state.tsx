import StateHistory from '../challenge-info/data/equipmentStateHistory.json';

export const getEquipmentsCurrentState = () => {
  const equipmentStateHistory = StateHistory;

  const equipmentsState = equipmentStateHistory.map(
    ({ equipmentId, states }) => {
      const lastState = states.length - 1;

      return {
        equipmentId,
        currentState: states[lastState].equipmentStateId,
      };
    },
  );

  return equipmentsState;
};
