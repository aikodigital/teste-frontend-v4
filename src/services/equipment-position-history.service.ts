import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EquipmentPositionHistory } from '../models/equipment-position-history';

@Injectable()
export class EquipmentPositionHistoryService {
  private path = '/data/equipmentPositionHistory.json';

  constructor(private httpClient: HttpClient) {}

  findEquipmentsByIds(equipmentIds: string[]): Observable<EquipmentPositionHistory[]> {
    return this.httpClient.get<EquipmentPositionHistory[]>(this.path).pipe(
      map((equipmentPositionHistory) => {
        return equipmentPositionHistory.filter((equipmentPositionHistory) =>
          equipmentIds.includes(equipmentPositionHistory.equipmentId)
        );
      })
    );
  }

  findByEquipmentId(equipmentId: string): Observable<EquipmentPositionHistory | undefined> {
    return this.httpClient.get<EquipmentPositionHistory[]>(this.path).pipe(
      map((equipmentPositionHistory) => {
        const equipmentModel = equipmentPositionHistory.find(
          (_equipmentPositionHistory) => _equipmentPositionHistory.equipmentId === equipmentId
        );
        return equipmentModel;
      }),
      map((equipmentPositionHistory) => {
        return (
          equipmentPositionHistory && {
            ...equipmentPositionHistory,
            positions: equipmentPositionHistory?.positions?.sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            }),
          }
        );
      })
    );
  }
}
