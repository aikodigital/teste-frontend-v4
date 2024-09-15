import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import positions from '../../../assets/data/equipmentPositionHistory.json'
import states from '../../../assets/data/equipmentStateHistory.json'
import stateInfo from '../../../assets/data/equipmentState.json'

interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface Equipment {
  equipmentId: string;
  positions: Position[];
}

interface EquipmentState {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}

interface StateInfo {
  id: string;
  name: string;
  color: string;
}

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  private equipamentPositions: any = positions;
  private equipmentStates: any = states;
  private stateInfo: any = stateInfo;

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
      const latestState = this.getLatestStateInfo(equipment.equipmentId);

      if (latestPosition && latestState) {
        const customIcon = L.divIcon({
          className: 'marker-icon',
          html: `<div style="background-color: ${latestState.color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
        });

        const marker = L.marker([latestPosition.lat, latestPosition.lon], { icon: customIcon }).addTo(map);
        marker.bindPopup(
          `<b>Equipamento:</b> ${equipment.equipmentId}<br>
          <b>Data:</b> ${latestPosition.date}<br>
          <b>Estado:</b> ${latestState.name}`
        );
      }
    });
  }

  private getLatestPosition(positions: Position[]): Position | undefined {
    if (!positions || positions.length === 0) {
      return undefined;
    }

    return positions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }

  private getLatestStateInfo(equipmentId: string): StateInfo | undefined {
    const equipmentState = this.equipmentStates.find((state: EquipmentState) => state.equipmentId === equipmentId);

    if (!equipmentState || equipmentState.states.length === 0) {
      return undefined;
    }

    const latestState = equipmentState.states.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    return this.stateInfo.find((info: StateInfo) => info.id === latestState.equipmentStateId);
  }
}
