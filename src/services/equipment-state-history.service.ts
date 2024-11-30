import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EquipmentStateHistory } from '../models/equipment-state-history';

@Injectable()
export class EquipmentStateHistoryService {
  private path = '/data/equipmentStateHistory.json';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<EquipmentStateHistory[]> {
    return this.httpClient.get<EquipmentStateHistory[]>(this.path);
  }

  listByEquipmentIds(equipmentIds: string[]): Observable<EquipmentStateHistory[]> {
    return this.httpClient.get<EquipmentStateHistory[]>(this.path).pipe(
      map((equipmentStateHistory) => {
        return equipmentStateHistory.filter((equipmentStateHistory) =>
          equipmentIds.includes(equipmentStateHistory.equipmentId)
        );
      })
    );
  }

  findByEquipmentId(equipmentId: string): Observable<EquipmentStateHistory | undefined> {
    return this.httpClient.get<EquipmentStateHistory[]>(this.path).pipe(
      map((equipmentStateHistory) => {
        const equipmentModel = equipmentStateHistory.find(
          (_equipmentStateHistory) => _equipmentStateHistory.equipmentId === equipmentId
        );
        return equipmentModel;
      })
    );
  }
}
