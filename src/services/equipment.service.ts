import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { Equipment } from '../models/equipment';
import { EquipmentModelService } from './equipment-model.service';

@Injectable()
export class EquipmentService {
  private path = '/data/equipment.json';

  constructor(
    private httpClient: HttpClient,
    private equipmentModelService: EquipmentModelService
  ) {}

  listEquipments(): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(this.path).pipe(
      mergeMap((equipments) => {
        const equimentModelResponses = equipments.map((equipment) =>
          this.equipmentModelService.listEquipmentModel(equipment.equipmentModelId)
        );

        return forkJoin(equimentModelResponses).pipe(
          map((equipmentModel, index) => {
            return equipments.map(
              (equipment) =>
                ({
                  ...equipment,
                  equipmentModel: equipmentModel.at(index),
                }) as Equipment
            );
          })
        );
      })
    );
  }
}
