import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import data from '../../../assets/data/equipmentPositionHistory.json'

interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface Equipment {
  equipmentId: string;
  positions: Position[];
}

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  private equipamentPositions: any = data;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    let config = {
      minZoom: 10,
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
    this.equipamentPositions.forEach((equipment: Equipment) => {
      const latestPosition = this.getLatestPosition(equipment.positions);

      if (latestPosition) {
        const marker = L.marker([latestPosition.lat, latestPosition.lon]).addTo(map);
        marker.bindPopup(`<b>Equipment ID:</b> ${equipment.equipmentId}<br><b>Date:</b> ${latestPosition.date}`);
      }
    });
  }

  private getLatestPosition(positions: Position[]): Position | undefined {
    if (!positions || positions.length === 0) {
      return undefined;
    }

    return positions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }
}
