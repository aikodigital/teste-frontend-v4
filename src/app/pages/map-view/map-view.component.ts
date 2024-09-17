import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { EquipmentHistoryComponent } from '../../components/equipment-history/equipment-history.component';
import { CommonModule } from '@angular/common';
import { MapService } from '../../services/map/map.service';
import { EquipmentService } from '../../services/equipment/equipment.service';

interface PositionHistory {
  equipmentId: string,
  positions: Position[]
}

interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface State {
  id: string;
  name: string;
  color: string;
}

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [EquipmentHistoryComponent, CommonModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  private positionHistory: any;
  private stateHistory: any;
  private models: any;
  private state: any;
  private equipments: any;

  public sidebarVisible: boolean = false;
  public selectedEquipment: any;

  constructor(
    private mapService: MapService,
    private equipmentService: EquipmentService
  ) { }

  ngOnInit(): void {
    this.mapService.isSidebarOpen$.subscribe(status => {
      this.sidebarVisible = status;
    });

    this.loadData();
    this.initMap();
  }

  private loadData() {
    this.equipments = this.equipmentService.getEquipmentsData();
    this.models = this.equipmentService.getModelsData();
    this.positionHistory = this.equipmentService.getPositionsHistoryData();
    this.state = this.equipmentService.getStatesData();
    this.stateHistory = this.equipmentService.getStateHistoryData();
  }

  private initMap(): void {
    let config = {
      minZoom: 6,
      maxZoom: 17,
    };
    const zoom = 10;

    const lat = -19.231295;
    const lng = -46.104467;

    const map = L.map("map", config).setView([lat, lng], zoom);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    this.displayEquipmentMarkers(map);
  }

  private displayEquipmentMarkers(map: L.Map): void {
    this.positionHistory.forEach((positions: PositionHistory) => {
      const latestPosition = this.equipmentService.getLatestPosition(positions.positions);
      const latestState = this.equipmentService.getLatestStateInfo(positions.equipmentId, this.stateHistory, this.state);
      const model = this.equipmentService.getModelInfo(positions.equipmentId, this.equipments, this.models);
      const equipment = this.equipmentService.getEquipmentInfo(positions.equipmentId, this.equipments);

      if (latestPosition && latestState) {
        const customIcon = L.divIcon({
          className: 'marker-icon',
          html: `<div style="background-color: ${latestState.color}; width: 38px; height: 38px; border-radius: 50%; border: 2px solid white; margin-left: -15px; display:flex; align-items: center; justify-content: center;">
          <img src="assets/img/${model!.name}.svg" alt="${model!.name}" style="width: 26px; height: 26px;">
          </div>`,
        });

        const marker = L.marker([latestPosition.lat, latestPosition.lon], { icon: customIcon }).addTo(map);

        marker.on('mouseover', () => {
          marker.bindPopup(
            `<b>Nome:</b> ${equipment!.name}<br>
            <b>Modelo:</b> ${model!.name}<br>
            <b>Data:</b> ${latestPosition.date}<br>
            <b>Estado:</b> ${latestState.name}<br>`
          ).openPopup();
        });
        marker.on('mouseout', () => {
          marker.closePopup();
        });

        marker.on('click', () => {
          this.showSidebar(positions.equipmentId, latestState, model!.name, equipment!.name);
        });
      }
    });
  }

  onMapClick(event: MouseEvent) {
    this.sidebarVisible = false;
  }

  private showSidebar(equipmentId: string, latestState: State, model: string, name: string): void {
    this.selectedEquipment = {
      equipmentId,
      latestState,
      model,
      name
    };
    this.sidebarVisible = true;
  }
}
