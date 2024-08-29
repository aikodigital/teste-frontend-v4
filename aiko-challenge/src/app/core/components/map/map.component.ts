import { Component, inject, Input, OnInit } from '@angular/core';
import * as LF from 'leaflet';
import { IPosition } from '../../interfaces/iPosition';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { ICustomEquipment } from '../../interfaces/iCustomEquipment';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private equipmentService = inject(EquipmentService);

  @Input() markerPositions: IPosition[] | undefined;

  map: LF.Map | undefined;
  center: LF.LatLngExpression = [-19.151801, -46.007759];

  ngOnInit(): void {
    this.initializeMap();
    this.addTileLayer();
    this.subscribeToPositions();
  }

  initializeMap(): void {
    this.map = LF.map('map').setView(this.center, 10);
  }

  addTileLayer(): void {
    if (this.map) {
      LF.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        this.map
      );
    }
  }

  subscribeToPositions(): void {
    this.equipmentService.equipments.subscribe((elements) => {
      elements.forEach((item) => {
        this.addMarker(item);
      });
    });
  }

  addMarker(equipment: ICustomEquipment): void {
    if (!this.map) return;
    console.log(equipment);
    const icon = this.createCustomIcon(equipment.equipmentModelId);
    const layer = LF.marker(
      [equipment.latestPosition.lat, equipment.latestPosition.lon],
      { icon }
    ).addTo(this.map);

    layer.bindPopup(`
      <b>${equipment.model.name}</b><br>
      Estado atual: ${equipment.stateList.slice(-1)[0].name}<br>
    `);

    layer.on('mouseover', () => {
      layer.openPopup();
    });

    layer.on('click', () => {
      this.equipmentService.selectedEquipment.next(equipment);
    });
  }

  createCustomIcon(equipmentModelId: string): LF.DivIcon {
    return LF.divIcon({
      className: 'triangle-marker',
      iconAnchor: [0, 24],
      popupAnchor: [0, -36],
      html: `<span class="marker ${this.getMarkerColorClass(
        equipmentModelId
      )}"/>`,
    });
  }

  getMarkerColorClass(equipmentModelId: string): string {
    const colorClassMap: { [key: string]: string } = {
      'a3540227-2f0e-4362-9517-92f41dabbfdf': 'marker-color-yellow',
      'a4b0c114-acd8-4151-9449-7d12ab9bf40f': 'marker-color-pink',
      '9c3d009e-0d42-4a6e-9036-193e9bca3199': 'marker-color-blue',
    };

    return colorClassMap[equipmentModelId] || 'marker-color-default';
  }
}
