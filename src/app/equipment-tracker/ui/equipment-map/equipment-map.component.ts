import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import * as leaflet from 'leaflet';
import dayjs from 'dayjs';
import { Equipment } from '../../../../models/equipment';
import { EquipmentPosition } from '../../../../models/equipment-position';

@Component({
  selector: 'app-equipment-map',
  standalone: true,
  imports: [],
  templateUrl: './equipment-map.component.html',
  styleUrl: './equipment-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentMapComponent implements AfterViewInit {
  equipments: InputSignal<Equipment[]> = input<Equipment[]>([]);

  equipmentEvent: OutputEmitterRef<Equipment> = output<Equipment>();

  map: leaflet.Map;

  historyMarkers: leaflet.LayerGroup;

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

  centerMap(equipments: Equipment[]): void {
    if (equipments.length) {
      equipments.forEach((equipment) => {
        if (equipment.positions?.length) {
          const lastPosition = equipment.positions[equipment.positions.length - 1];
          this.map.panTo(new leaflet.LatLng(lastPosition.lat, lastPosition.lon));
        }
      });
    }
  }

  clearMap(): void {
    this.map.eachLayer((layer) => {
      if (layer instanceof leaflet.Marker || layer instanceof leaflet.Polyline) {
        this.map.removeLayer(layer);
      }
    });
  }

  loadPolylines(equipment: Equipment[]): void {
    equipment.forEach((equipment) => {
      if (equipment?.positions?.length) {
        const position = equipment.positions[equipment.positions.length - 1];
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

  loadEquipmentPositions(equipments: Equipment[]): void {
    equipments.forEach((equipment) => {
      let acronym = equipment.name.split('-')[0];

      if (!acronym) {
        acronym = 'CA';
      }

      if (!equipment.states?.length) {
        return;
      }

      if (!equipment?.positions?.length) {
        return;
      }

      const lastPosition = equipment.positions[equipment.positions.length - 1];
      const lastState = equipment.states[equipment.states.length - 1];

      const icon = leaflet.icon({
        iconUrl: `/svgs/equipments/${acronym}.svg`,
        popupAnchor: [3, -76],
        iconAnchor: [18, 60],
      });

      leaflet
        .marker([lastPosition.lat, lastPosition.lon], { icon })
        .addTo(this.map)
        .bindPopup(
          `
            <div class="flex flex-col">
              <div><span class="font-bold">${equipment.name}</span></div>
              <div><span class="font-bold">${equipment.equipmentModel?.name}</span></div>
              <div><span class="font-bold">Latidude:</span> ${lastPosition.lat}</div>
              <div><span class="font-bold">Longitude:</span> ${lastPosition.lon}</div>
              <div><span class="font-bold">Data:</span> ${dayjs(lastPosition.date).format('DD/MM/YYYY HH:mm:ss')}</div>
              <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
              <div><span class="font-bold">Status:</span> <span style="color: ${lastState?.state?.color}" class="font-bold">${lastState?.state?.name}</span></div>
            </div>
        `
        )
        .on('click', () => {
          // this.historyMarkers.clearLayers();
          // equipment.positions && this.loadEquipmentsPositionHistory(equipment.positions);
          this.equipmentEvent.emit(equipment);
        });
    });
  }

  loadEquipmentsPositionHistory(position: EquipmentPosition[]): void {
    position.forEach((position) => {
      leaflet.marker([position.lat, position.lon]).addTo(this.historyMarkers);
    });

    // leaflet.marker([position.lat, position.lon]).addTo(this.map);
    // .bindPopup(
    //   `
    //       <div class="flex flex-col">
    //         <div><span class="font-bold">${equipment.name}</span></div>
    //         <div><span class="font-bold">${equipment.equipmentModel?.name}</span></div>
    //         <div><span class="font-bold">Latidude:</span> ${lastPosition.lat}</div>
    //         <div><span class="font-bold">Longitude:</span> ${lastPosition.lon}</div>
    //         <div><span class="font-bold">Data:</span> ${dayjs(lastPosition.date).format('DD/MM/YYYY HH:mm:ss')}</div>
    //         <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
    //         <div><span class="font-bold">Status:</span> <span style="color: ${lastState?.state?.color}" class="font-bold">${lastState?.state?.name}</span></div>
    //       </div>
    //   `
    // );
  }

  initMap(): void {
    this.map = leaflet.map('map', {
      center: [-12.968771962612362, -38.459164029077826],
      zoom: 10,
    });

    this.historyMarkers = leaflet.layerGroup();

    this.historyMarkers.addTo(this.map);
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
