import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Map, marker, Marker, tileLayer } from 'leaflet';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { MapService } from '../../services/map.service';

import { Equipment } from '../../models/equipment';
import { EquipmentState } from '../../models/equipment-state';
import { PositionHistory } from '../../models/position';
import { StateHistory } from '../../models/state-history';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapService],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map?: Map;
  private destroy$ = new Subject<void>();
  private markers: Marker[] = [];

  constructor(private dataService: DataService, private mapService: MapService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.map?.remove();
  }

  private loadData(): void {
    combineLatest([
      this.dataService.equipmentStateSignal,
      this.dataService.equipmentsSignal,
      this.dataService.equipmentPositionsSignal,
      this.dataService.equipmentStateHistorySignal,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([states, equipments, positions, stateHistory]) => {
        this.updateMapMarkers(states, equipments, positions, stateHistory);
      });
  }

  private initMap(): void {
    if (!this.map) {
      this.map = new Map('map').setView([-23.55052, -46.633308], 10);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);
    }
  }

  private updateMapMarkers(
    states: EquipmentState[],
    equipments: Equipment[],
    positions: PositionHistory[],
    stateHistory: StateHistory[]
  ): void {
    this.clearMarkers();

    positions.forEach((position) => {
      const latestPosition = this.mapService.getLatestPosition(position);
      if (latestPosition) {
        const equipment = equipments.find((e) => e.id === position.equipmentId);
        const equipmentStateHistory = stateHistory.filter((h) => h.equipmentId === position.equipmentId);
        const newMarker = this.createMarker(latestPosition, equipment, equipmentStateHistory, states);
        this.markers.push(newMarker);
        newMarker.addTo(this.map!);
      }
    });
  }

  private createMarker(
    position: { lat: number; lon: number; date: string },
    equipment: Equipment | undefined,
    equipmentStateHistory: StateHistory[],
    states: EquipmentState[]
  ): Marker {
    const newMarker = marker([position.lat, position.lon]);
    const popupContent = this.buildPopupContent(equipment, equipmentStateHistory, states);
    newMarker.bindPopup(popupContent);
    newMarker.on('click', () => this.viewEquipmentHistory(equipment?.id || ''));
    return newMarker;
  }

  private buildPopupContent(
    equipment: Equipment | undefined,
    equipmentStateHistory: StateHistory[],
    states: EquipmentState[]
  ): string {
    const equipmentName = equipment?.name || 'Unknown Equipment';
    let content = `<h3>${equipmentName}</h3>`;

    if (equipmentStateHistory.length) {
      content += `<h4>State History:</h4><ul>`;
      equipmentStateHistory.forEach((history) => {
        history.states.forEach((stateRecord) => {
          const stateDetails = states.find((s) => s.id === stateRecord.equipmentStateId);
          const stateName = stateDetails?.name || 'Unknown';
          const stateColor = stateDetails?.color || '#000';
          content += `
            <li>
              <span style="color: ${stateColor}; font-weight: bold;">${stateName}</span>
              on ${new Date(stateRecord.date).toLocaleString()}
            </li>
          `;
        });
      });
      content += `</ul>`;
    } else {
      content += `<p>No state history available.</p>`;
    }

    return content;
  }

  private clearMarkers(): void {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
  }

  private viewEquipmentHistory(equipmentId: string): void {
    console.log(`Viewing history for equipment: ${equipmentId}`);
    // Implement detailed history view logic here
  }
}
