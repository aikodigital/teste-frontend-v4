import { IPosition } from '../services/EquipmentPositionService/IPositionService';

/**
 * Finds the most recent position in a list of equipment position history.
 * @param positionHistories - List of equipment position history.
 * @returns The most recent position or null if none is found.
 */
export function getMostRecentPosition(
  positionHistories: IPosition[]
): IPosition | null {
  if (positionHistories.length === 0) {
    return null;
  }

  const mostRecentState = positionHistories.reduce(
    (latestState, currentState) => {
      const latestDate = new Date(latestState.date);
      const currentDate = new Date(currentState.date);

      return currentDate > latestDate ? currentState : latestState;
    }
  );

  return mostRecentState;
}
