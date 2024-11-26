import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../models/state';

@Injectable()
export class StateService {
  readonly path = '/data/equipmentState.json';

  constructor(private httpClient: HttpClient) {}

  listStates(): Observable<State> {
    return this.httpClient.get<State>(this.path);
  }
}
