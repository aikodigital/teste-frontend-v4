import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { State } from '../models/state';

@Injectable()
export class StateService {
  readonly path = '/data/equipmentState.json';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<State[]> {
    return this.httpClient.get<State[]>(this.path);
  }

  find(id: string): Observable<State | undefined> {
    return this.httpClient.get<State[]>(this.path).pipe(map((states) => states.find((state) => state.id === id)));
  }
}
