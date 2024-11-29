import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Equipment } from '../models/equipment';

@Injectable()
export class EquipmentService {
  private path = '/data/equipment.json';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(this.path);
  }

  find(id: string): Observable<Equipment | undefined> {
    return this.httpClient
      .get<Equipment[]>(this.path)
      .pipe(map((equipments) => equipments.find((equipment) => equipment.id === id)));
  }
}
