import { Injectable } from '@angular/core';
import { PositionHistory } from '../models/position';
import { StateHistory } from '../models/state-history';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // Returns the latest position of the equipment
  getLatestPosition(positionHistory: PositionHistory): { lat: number; lon: number; date: string } | null {
    if (!positionHistory.positions.length) return null;
    return positionHistory.positions[positionHistory.positions.length - 1];
  }

  // Returns the latest state of the equipment
  getEquipmentLatestState(
    equipmentId: string,
    statesHistory: StateHistory[]
  ): { equipmentStateId: string; date: string } | null {
    const history = statesHistory.find(h => h.equipmentId === equipmentId);
    return history ? history.states[history.states.length - 1] : null;
  }
}
