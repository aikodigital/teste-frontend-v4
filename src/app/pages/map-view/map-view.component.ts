import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import equipments from '../../../assets/data/equipment.json'
import models from '../../../assets/data/equipmentModel.json'
import state from '../../../assets/data/equipmentState.json'
import positionHistory from '../../../assets/data/equipmentPositionHistory.json'
import stateHistory from '../../../assets/data/equipmentStateHistory.json'

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
  private positionHistory: any = positionHistory;
  private stateHistory: any = stateHistory;
  private models: any = models;
  private state: any = state;
  private equipments: any = equipments;

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
    this.initMap();
  }

  private initMap(): void {
    let config = {
      minZoom: 6,
      maxZoom: 17,
    };
    const zoom = 9;

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
          html: `<div style="background-color: ${latestState.color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
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
          this.showSidebar(positions.equipmentId, latestPosition, latestState);
        });
      }
    });
  }

  private showSidebar(equipmentId: string, latestPosition: Position, latestState: State): void {
    this.selectedEquipment = {
      equipmentId,
      latestPosition,
      latestState
    };
    this.sidebarVisible = true;
  }
}
