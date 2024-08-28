import { Component, inject, Input, OnInit } from '@angular/core';
import * as LF from 'leaflet';
import { IPosition } from '../../interfaces/iPosition';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { IEquipmentState } from '../../interfaces/iEquipmentState';
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
  center: LF.LatLngExpression = [-15.7801, -47.9292];

  ngOnInit(): void {
    this.initializeMap();
    this.addTileLayer();
    this.subscribeToPositions();
  }

  private initializeMap(): void {
    this.map = LF.map('map').setView(this.center, 6);
  }

  private addTileLayer(): void {
    if (this.map) {
      LF.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        this.map
      );
    }
  }

  private subscribeToPositions(): void {
    this.equipmentService.positions.subscribe((positions) => {
      positions.forEach((item) => {
        this.addMarker(item);
      });
    });
  }

  private addMarker(equipment: ICustomEquipment): void {
    if (!this.map) return;
    console.log(equipment);
    const status = equipment.model.hourlyEarnings.slice(-1)[0].status;
    const icon = this.createCustomIcon(equipment.equipmentModelId);
    const layer = LF.marker(
      [equipment.latestPosition.lat, equipment.latestPosition.lon],
      { icon }
    ).addTo(this.map);

    layer.bindPopup(`
      <b>${equipment.model.name}</b><br>
      Estado atual: ${status!.name}
    `);

    layer.on('mouseover', () => {
      layer.openPopup();
    });

    let arr: IEquipmentState[] = [];
    layer.on('click', () => {
      this.equipmentService
        .getEquipmentStateHistory(equipment.id)
        ?.states.forEach((item) => {
          arr.push(
            this.equipmentService.getEquipmentState(item.equipmentStateId)!
          );
        });

      this.equipmentService.equipmentStateHistory.next({
        stateHistory: arr,
        equipmentInfo: equipment,
      });
      console.log(arr);
    });
  }

  private createCustomIcon(equipmentModelId: string): LF.DivIcon {
    const markerHtmlStyles = `
      background-color: ${this.getMarkerColor(equipmentModelId)};
      width: 2rem;
      height: 2rem;
      display: block;
      left: -1.5rem;
      top: -1.5rem;
      position: relative;
      border-radius: 3rem 4rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF
    `;

    return LF.divIcon({
      className: 'my-custom-pin',
      iconAnchor: [0, 24],
      popupAnchor: [0, -36],
      html: `<span style="${markerHtmlStyles}" />`,
    });
  }

  private getMarkerColor(equipmentModelId: string): string {
    const colorMap: { [key: string]: string } = {
      'a3540227-2f0e-4362-9517-92f41dabbfdf': '#fdcb6e',
      'a4b0c114-acd8-4151-9449-7d12ab9bf40f': '#fd79a8',
      '9c3d009e-0d42-4a6e-9036-193e9bca3199': '#0984e3',
    };

    return colorMap[equipmentModelId] || '#CCCCCC';
  }
}
