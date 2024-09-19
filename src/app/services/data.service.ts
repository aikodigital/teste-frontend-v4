import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Equipment } from '../models/equipment';
import { EquipmentState } from '../models/equipment-state';
import { PositionHistory } from '../models/position';
import { StateHistory } from '../models/state-history';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly urls = {
    equipments: 'assets/data/equipment.json',
    positions: 'assets/data/equipmentPositionHistory.json',
    stateHistory: 'assets/data/equipmentStateHistory.json',
    states: 'assets/data/equipmentState.json'
  };

  equipmentsSignal = new BehaviorSubject<Equipment[]>([]);
  equipmentPositionsSignal = new BehaviorSubject<PositionHistory[]>([]);
  equipmentStateHistorySignal = new BehaviorSubject<StateHistory[]>([]);
  equipmentStateSignal = new BehaviorSubject<EquipmentState[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.loadData(this.urls.equipments, this.equipmentsSignal);
    this.loadData(this.urls.positions, this.equipmentPositionsSignal);
    this.loadData(this.urls.stateHistory, this.equipmentStateHistorySignal);
    this.loadData(this.urls.states, this.equipmentStateSignal);
  }

  private loadData<T>(url: string, signal: BehaviorSubject<T[]>): void {
    this.http.get<T[]>(url).subscribe({
      next: data => signal.next(data),
      error: error => {
        console.error(`Erro ao carregar ${url}:`, error);
        signal.next([]);
      }
    });
  }
}
