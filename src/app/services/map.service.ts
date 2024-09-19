import { Injectable } from '@angular/core';
import { PositionHistory } from '../models/position';
import { StateHistory } from '../models/state-history';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  getLatestPosition(positionHistory: PositionHistory): { lat: number; lon: number; date: string } | null {
    return positionHistory.positions.length ? positionHistory.positions.slice(-1)[0] : null;
  }

  getLatestState(equipmentId: string, statesHistory: StateHistory[]): { equipmentStateId: string; date: string } | null {
    const history = statesHistory.find(h => h.equipmentId === equipmentId);
    return history?.states.slice(-1)[0] ?? null;
  }
}
