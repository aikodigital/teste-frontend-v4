import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { EquipmentModel } from '../models/equipment-model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentModelService {
  readonly path = '/data/equipmentModel.json';

  constructor(private httpClient: HttpClient) {}

  listEquipmentModel(id: string): Observable<EquipmentModel | EquipmentModel[] | undefined> {
    return this.httpClient.get<EquipmentModel | EquipmentModel[] | undefined>(this.path).pipe(
      map((equipmentModels) => {
        const equipmentModel = (equipmentModels as EquipmentModel[]).find((equipmentModel) => equipmentModel.id === id);
        return equipmentModel;
      })
    );
  }
}
