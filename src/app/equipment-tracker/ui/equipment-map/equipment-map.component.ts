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
  equipments: InputSignal<EquipmentPositionHistory[] | undefined> = input<EquipmentPositionHistory[] | undefined>(
    undefined
  );

  map: leaflet.Map;

  constructor() {
    effect(() => {
      const equipments = this.equipments();

      if (equipments) {
        this.clearMap();
        this.loadEquipmentPositions(equipments);
        this.loadPolylines(equipments);
        this.centerMap(equipments);

        // Reload the map
        this.map.invalidateSize();
      }
    });
  }

  centerMap(equipmentHistory: EquipmentPositionHistory[]): void {
    if (equipmentHistory.length) {
      this.map.panTo(new leaflet.LatLng(equipmentHistory[0].positions[0].lat, equipmentHistory[0].positions[0].lon));
    }
  }

  clearMap(): void {
    this.map.eachLayer((layer) => {
      if (layer instanceof leaflet.Marker || layer instanceof leaflet.Polyline) {
        this.map.removeLayer(layer);
      }
    });
  }

  loadPolylines(equipmentHistory: EquipmentPositionHistory[]): void {
    equipmentHistory.forEach((equipmentHistory) => {
      if (equipmentHistory?.positions.length) {
        const position = equipmentHistory.positions[equipmentHistory.positions.length - 1];
        const coordinates = [[position.lat, position.lon] as [number, number]];

        if (coordinates) {
          leaflet
            .polyline(coordinates, {
              color: '#fff',
              weight: 3,
              opacity: 0.5,
              dashArray: [10, 10],
            })
            .addTo(this.map);
        }
      }
    });
  }

  loadEquipmentPositions(equipmentHistory: EquipmentPositionHistory[]): void {
    // let acronym = equipment?.name.split('-')[0];

    // if (!acronym) {
    //   acronym = 'CA';
    // }

    equipmentHistory.forEach((equipment) => {
      if (equipment?.positions.length) {
        const position = equipment.positions[equipment.positions.length - 1];

        const icon = leaflet.icon({
          iconUrl: `/imgs/equipments/CA.svg`,
          popupAnchor: [3, -76],
          iconAnchor: [18, 60],
        });

        leaflet.marker([position.lat, position.lon], { icon }).addTo(this.map).bindPopup(`
            <div class="flex flex-col">
              <div><span class="font-bold">CA-0001</span></div>
              <div><span class="font-bold">Latidude:</span> ${position.lat}</div>
              <div><span class="font-bold">Longitude:</span> ${position.lon}</div>
              <div><span class="font-bold">Data:</span> ${dayjs(position.date).format('DD/MM/YYYY HH:mm:ss')}</div>
              <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
              <div><span class="font-bold">Status:</span> <span class="font-bold text-green-500">Operando</span></div>
            </div>
        `);
      }

      // equipment?.positions.forEach((position) => {

      // });
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
