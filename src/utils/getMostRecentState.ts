import { IState } from '../services/EquipmentStateService/IEquipmentStateService';

/**
 * Finds the most recent state in a list of equipment state history.
 * @param stateHistories - List of equipment state history.
 * @returns The most recent state or null if none is found.
 */
export function getMostRecentState(stateHistories: IState[]): IState | null {
  if (stateHistories.length === 0) {
    return null;
  }

  const mostRecentState = stateHistories.reduce((latestState, currentState) => {
    const latestDate = new Date(latestState.date);
    const currentDate = new Date(currentState.date);

    return currentDate > latestDate ? currentState : latestState;
  });

  return mostRecentState;
}
