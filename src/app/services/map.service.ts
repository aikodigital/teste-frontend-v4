import { Injectable } from '@angular/core';
import { PositionHistory } from '../models/position';
import { EquipmentStateHistory } from '../models/state-history';

@Injectable()
export class MapService {

  // Retorna a última posição do equipamento
  getLatestPosition(positionData: PositionHistory): { lat: number; lon: number } | undefined {
    return positionData.positions.slice(-1)[0];
  }

  // Retorna o estado mais recente do equipamento
  getEquipmentLatestState(equipmentId: string, equipmentStatesHistory: EquipmentStateHistory[]): string {
    const equipmentHistory = equipmentStatesHistory.find(s => s.equipmentId === equipmentId);
    if (equipmentHistory && equipmentHistory.states.length > 0) {
      const latestState = equipmentHistory.states.slice(-1)[0]; // Pega o estado mais recente
      return latestState.equipmentStateId;
    }
    return 'Desconhecido';
  }
}
