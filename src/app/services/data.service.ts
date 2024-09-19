import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Equipment } from '../models/equipment';
import { PositionHistory } from '../models/position';
import { StateHistory } from '../models/state-history';
import { EquipmentState } from '../models/equipment-state';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private equipmentUrl = 'assets/data/equipment.json';
  private equipmentPositionHistoryUrl = 'assets/data/equipmentPositionHistory.json';
  private equipmentStateHistoryUrl = 'assets/data/equipmentStateHistory.json';
  private equipmentStateUrl = 'assets/data/equipmentState.json';

  // Observables para os dados
  equipmentsSignal = new BehaviorSubject<Equipment[]>([]);
  equipmentPositionsSignal = new BehaviorSubject<PositionHistory[]>([]);
  equipmentStateHistorySignal = new BehaviorSubject<StateHistory[]>([]);
  equipmentStateSignal = new BehaviorSubject<EquipmentState[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  // Carrega os dados iniciais de arquivos locais ou backend
  private loadInitialData(): void {
    this.http.get<Equipment[]>(this.equipmentUrl).subscribe({
      next: (data) => this.equipmentsSignal.next(data),
      error: (error) => {
        console.error('Erro ao carregar equipamentos:', error);
        this.equipmentsSignal.next([]);
      },
    });

    this.http.get<PositionHistory[]>(this.equipmentPositionHistoryUrl).subscribe({
      next: (data) => this.equipmentPositionsSignal.next(data),
      error: (error) => {
        console.error('Erro ao carregar histórico de posições:', error);
        this.equipmentPositionsSignal.next([]);
      },
    });

    this.http.get<StateHistory[]>(this.equipmentStateHistoryUrl).subscribe({
      next: (data) => this.equipmentStateHistorySignal.next(data),
      error: (error) => {
        console.error('Erro ao carregar histórico de estados:', error);
        this.equipmentStateHistorySignal.next([]);
      },
    });

    this.http.get<EquipmentState[]>(this.equipmentStateUrl).subscribe({
      next: (data) => this.equipmentStateSignal.next(data),
      error: (error) => {
        console.error('Erro ao carregar estados dos equipamentos:', error);
        this.equipmentStateSignal.next([]);
      },
    });
  }
}
