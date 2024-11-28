import { AfterViewInit, ChangeDetectionStrategy, Component, effect, input, InputSignal } from '@angular/core';
import * as leaflet from 'leaflet';
import { EquipmentPositionHistory } from '../../../../models/equipment-position-history';
import dayjs from 'dayjs';

@Component({
  selector: 'app-equipment-map',
  standalone: true,
  imports: [],
  templateUrl: './equipment-map.component.html',
  styleUrl: './equipment-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentMapComponent implements AfterViewInit {
  equipmentLocations: InputSignal<EquipmentPositionHistory> = input<EquipmentPositionHistory>(
    {} as EquipmentPositionHistory
  );

  map: leaflet.Map;

  constructor() {
    effect(() => {
      const equipment = this.equipmentLocations();

      this.clearMap();
      this.loadEquipmentPositions(equipment);
      this.loadPolylines(equipment);
      this.centerMap(equipment);

      // Reload the map
      this.map.invalidateSize();
    });
  }

  centerMap(equipment: EquipmentPositionHistory): void {
    if (equipment && equipment.positions.length) {
      this.map.panTo(new leaflet.LatLng(equipment.positions[0].lat, equipment.positions[0].lon));
    }
  }

  clearMap(): void {
    this.map.eachLayer((layer) => {
      if (layer instanceof leaflet.Marker || layer instanceof leaflet.Polyline) {
        this.map.removeLayer(layer);
      }
    });
  }

  loadPolylines(equipment: EquipmentPositionHistory): void {
    const coordinates = equipment.positions.map((position) => {
      return [position.lat, position.lon] as [number, number];
    });

    leaflet
      .polyline(coordinates, {
        color: '#fff',
        weight: 3,
        opacity: 0.5,
        dashArray: [10, 10],
      })
      .addTo(this.map);
  }

  loadEquipmentPositions(equipment: EquipmentPositionHistory): void {
    equipment.positions.forEach((position) => {
      const icon = leaflet.icon({
        iconUrl: '/imgs/equipments/CA.svg',
        popupAnchor: [3, -76],
        iconAnchor: [18, 60],
      });

      leaflet.marker([position.lat, position.lon], { icon }).addTo(this.map).bindPopup(`
            <div class="flex flex-col">
              <div><span class="font-bold">Latidude:</span> ${position.lat}</div>
              <div><span class="font-bold">Longitude:</span> ${position.lon}</div>
              <div><span class="font-bold">Data:</span> ${dayjs(position.date).format('DD/MM/YYYY HH:mm:ss')}</div>
            </div>
        `);
    });
  }

  initMap(): void {
    this.map = leaflet.map('map', {
      center: [-12.968771962612362, -38.459164029077826],
      zoom: 12,
    });
  }

  ngAfterViewInit(): void {
    this.initMap();

    leaflet
      .tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Produção Florestal',
      })
      .addTo(this.map);
  }
}
