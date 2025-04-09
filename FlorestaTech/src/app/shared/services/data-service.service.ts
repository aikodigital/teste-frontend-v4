import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { forkJoin, Observable } from 'rxjs';

// Models
import { equipamentModel } from '../models/equipament.models';
import { equipmentDataModel } from '../models/equipmentDataModel.model';
import { equipmentPositionHistoryModel } from '../models/equipmentPositionHistory.model';
import { equipamentStateModel } from '../models/equipmentState.model';
import { equipmentStateHistoryModel } from '../models/equipmentStateHistory.model';
import { equipamentDetailModel } from '../models/equipamentDetail.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private urlJsonEquipaments = './../../../assets/data/equipment.json';
  private urlJsonEquipamentModel = './../../../assets/data/equipmentModel.json';
  private urlJsonEquipamentPosHistory = './../../../assets/data/equipmentPositionHistory.json';
  private urlJsonEquipamentState = './../../../assets/data/equipmentState.json';
  private urlJsonEquipamentStateHistory = './../../../assets/data/equipmentStateHistory.json';

  constructor(private http: HttpClient) { }

  // Método para pegar os equipamentos.
  getDadosEquipaments(): Observable<equipamentModel[]> {
    return this.http.get<equipamentModel[]>(this.urlJsonEquipaments);
  }

  // Método para pegar os Dados dos equipamento.
  getDadosEquipamentModel(): Observable<equipmentDataModel[]> {
    return this.http.get<equipmentDataModel[]>(this.urlJsonEquipamentModel);
  }

  // Método para pegar o histórico dos equipamentos.
  getDadosEquipamentPosHistory(): Observable<equipmentPositionHistoryModel[]> {
    return this.http.get<equipmentPositionHistoryModel[]>(this.urlJsonEquipamentPosHistory);
  }

  // Método para pegar o estado do equipamentos.
  getDadosEquipamentState(): Observable<equipamentStateModel[]> {
    return this.http.get<equipamentStateModel[]>(this.urlJsonEquipamentState);
  }

  // Método para pegar o estado de histórico dos equipamentos.
  getDadosEquipamentStateHistory(): Observable<equipmentStateHistoryModel[]> {
    return this.http.get<equipmentStateHistoryModel[]>(this.urlJsonEquipamentStateHistory);
  }

  // Retorna os dados Json de todas as informações dos equipamentos.
  getEquipamentFullDetail(): Observable<any> {
    return forkJoin({
      equipments: this.getDadosEquipaments(),
      equipmentModels: this.getDadosEquipamentModel(),
      equipmentStates: this.getDadosEquipamentState(),
      equipmentStateHistory: this.getDadosEquipamentStateHistory(),
      equipmentPositionHistory: this.getDadosEquipamentPosHistory()
    });
  }
}
