import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsModule } from "@angular/google-maps";
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import { Equipment, EquipmentModel, EquipmentPositionHistory, EquipmentsList, EquipmentState, EquipmentStateHistory, EquipmentFormated, EquipmentsFormatedList } from './models/equipment';
import { DialogStateHistoryComponent } from './dialog-state-history/dialog-state-history.component';
import {  MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule, HttpClientModule, NgForOf, DialogStateHistoryComponent],
})
export class AppComponent {
  dialog = inject(MatDialog);

  options: google.maps.MapOptions = {
    center: { lat: -31, lng: 147 },
    zoom: 11,
  };

  equipments: any;
  equipmentsModel: any;
  equipmentsPositionHistory: any;
  equipmentsState: any;
  equipmentsStateHistory: any;
  equipmentsFormated = new EquipmentsFormatedList;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.assembleData();
  }

  assembleData(){
    this.equipmentsFormated.equipmentsFormatedList = [];
    
    this.getEquipments();
    this.getEquipmentsModel();
    this.getEquipmentPositionHistory();
    this.getEquipmentState();
    this.getEquipmentStateHistory();

    this.equipments?.forEach((equipment: Equipment) => {

      var equipmentFormated = new EquipmentFormated;
      var stateHistory = this.equipmentsStateHistory.find((element: EquipmentStateHistory) => element.equipmentId == equipment. id);
      var positionHistory = this.equipmentsPositionHistory.find((element: EquipmentPositionHistory) => element.equipmentId == equipment.id);
      var model = this.equipmentsModel.find((element: EquipmentModel) => element.id == equipment.equipmentModelId);
      var state = this.equipmentsState.find((element: EquipmentState) => element.id == stateHistory.states[stateHistory.states.length - 1].equipmentStateId);
      var postion = positionHistory.positions[positionHistory.positions.length - 1];
      var stateHistoryFormated: any = [];


      stateHistory.states.forEach((state: any) => {
        var stateName = this.equipmentsState.find((element: any) => element.id == state.equipmentStateId);
        var stateFormated = {
          date: state.date,
          equipmentStateId: state.equipmentStateId,
          stateName: stateName.name,
        }

        stateHistoryFormated.push(stateFormated);
      });

      const content = document.createElement('span');
      content.innerText = model.name == "Caminhão de carga" ? 'local_shipping' : model.name == "Harvester" ? 'front_loader' : 'auto_towing';
      content.className = state.name == "Operando" ? "material-symbols-outlined operating" : state.name == "Parado" ? "material-symbols-outlined stopped" : "material-symbols-outlined maintenance" ;

      equipmentFormated = {
        id : equipment.id,
        name : equipment.name,
        equipmentModelId : equipment.equipmentModelId,
        equipmentModelName: model.name,
        hourlyEarnings: model.hourlyEarnings,
        dateLastState: stateHistory.states[stateHistory.states.length - 1].date,
        stateId: state.id,
        stateName: state.name,
        stateColor: state.color,
        states: stateHistoryFormated,
        dateLastPosition: postion.date,
        position: {
          lat: postion.lat as google.maps.LatLng,
          lng: postion.lon as google.maps.LatLng,
        },
        positions: positionHistory.positions,
        content: content,
      }

      this.equipmentsFormated.equipmentsFormatedList.push(equipmentFormated);

    });

    this.options.center = this.equipmentsFormated.equipmentsFormatedList[0]?.position;
  }

  equipmentStateHistory(equipment: any){
    this.dialog.open(DialogStateHistoryComponent, {
      data: equipment,
      width: '600px',
    });
  }

  equipmentCurrentState(){
    console.log("teste");
  }

  getEquipments() {
    this.http.get<any>('assets/data/equipment.json').subscribe(response => {
      this.equipments = response;
    });
  }

  getEquipmentsModel() {
    this.http.get<any>('assets/data/equipmentModel.json').subscribe(response => {
      this.equipmentsModel = response;
    });
  }

  getEquipmentPositionHistory() {
    this.http.get<any>('assets/data/equipmentPositionHistory.json').subscribe(response => {
      this.equipmentsPositionHistory = response;
    });
  }

  getEquipmentState() {
    this.http.get<any>('assets/data/equipmentState.json').subscribe(response => {
      this.equipmentsState = response;
    });
  }

  getEquipmentStateHistory() {
    this.http.get<any>('assets/data/equipmentStateHistory.json').subscribe(response => {
      this.equipmentsStateHistory = response;
    });
  }


}
