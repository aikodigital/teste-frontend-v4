import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps'
import { EquipmentService } from './services/equipment.services';
import { MatDialog } from '@angular/material/dialog';
import { StatesHistoryComponent } from './shared/components/states-history/states-history.component';
import { EquipmentPosition, EquipmentToMapData } from './interfaces/equiments.interfaces';
import { FilterComponent } from "./components/filter/filter.component";
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule, FilterComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  historicPositions = signal<EquipmentPosition[]>([]);
  showHistoricPos = signal(false);
  title = 'angular-test';
  readonly dialog = inject(MatDialog);
  private equipmentService = inject(EquipmentService);
  //equipments = this.equipmentService.getEquipments;
  equipments = signal<EquipmentToMapData[]>(this.equipmentService.equiments());
  constructor() {}

  onGetEquipments(equipments:EquipmentToMapData[]){
    this.equipments.set(equipments);
  }
    
    display: any;
    center: google.maps.LatLngLiteral = {
        lat: -19.126536,
        lng: -45.947756
    };
    zoom = 10;

    onClick(equipment:EquipmentToMapData){
      const historic = this.equipmentService.getHistoyStates(equipment);
      this.dialog.open(StatesHistoryComponent,{
        data: historic
      }).afterClosed().subscribe( (result) => {
        if(result){
          this.showHistoricPos.set(true);
          this.historicPositions.set([...this.equipmentService.getHistoricPositions(equipment.id)] );
        }
      });
    }

    onShowAll(){
      this.showHistoricPos.set(false);
      this.equipments.set(this.equipmentService.equiments());
    }
    
    /*------------------------------------------
    --------------------------------------------
    moveMap()
    --------------------------------------------
    --------------------------------------------*/
    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = (event.latLng.toJSON());
    }
    
    /*------------------------------------------
    --------------------------------------------
    move()
    --------------------------------------------
    --------------------------------------------*/
    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }
}
