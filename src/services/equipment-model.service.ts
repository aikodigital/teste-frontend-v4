import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { EquipmentModel } from '../models/equipment-model';

@Injectable()
export class EquipmentModelService {
  readonly path = '/data/equipmentModel.json';

  constructor(private httpClient: HttpClient) {}

  find(id: string): Observable<EquipmentModel | undefined> {
    return this.httpClient.get<EquipmentModel[]>(this.path).pipe(
      map((equipmentModels) => {
        const equipmentModel = equipmentModels.find((equipmentModel) => equipmentModel.id === id);
        return equipmentModel;
      })
    );
  }

  listModelsByEquipmentIds(equipmentModelIds: string[]): Observable<EquipmentModel[]> {
    return this.httpClient.get<EquipmentModel[]>(this.path).pipe(
      map((equipmentModels) =>
        equipmentModels.filter((equipmentModel) => {
          return equipmentModelIds.includes(equipmentModel.id);
        })
      )
    );
  }
}
