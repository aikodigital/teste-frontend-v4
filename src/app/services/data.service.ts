import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Equipment } from '../models/equipment';
import { PositionHistory } from '../models/position';
import { EquipmentStateHistory } from '../models/state-history';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private equipmentUrl = 'assets/data/equipment.json';
  private equipmentPositionHistoryUrl = 'assets/data/equipmentPositionHistory.json';
  private equipmentStateHistoryUrl = 'assets/data/equipmentStateHistory.json';

  // Observables para os dados
  equipmentsSignal = new BehaviorSubject<Equipment[]>([]);
  equipmentPositionsSignal = new BehaviorSubject<PositionHistory[]>([]);
  equipmentStateHistorySignal = new BehaviorSubject<EquipmentStateHistory[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  // Carrega os dados iniciais do backend ou arquivos locais
  private loadInitialData(): void {
    this.http.get<Equipment[]>(this.equipmentUrl).subscribe(data => this.equipmentsSignal.next(data));
    this.http.get<PositionHistory[]>(this.equipmentPositionHistoryUrl).subscribe(data => this.equipmentPositionsSignal.next(data));
    this.http.get<EquipmentStateHistory[]>(this.equipmentStateHistoryUrl).subscribe(data => this.equipmentStateHistorySignal.next(data));
  }
}
