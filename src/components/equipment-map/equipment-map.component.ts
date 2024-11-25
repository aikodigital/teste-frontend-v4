import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-equipment-map',
  standalone: true,
  imports: [],
  templateUrl: './equipment-map.component.html',
  styleUrl: './equipment-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentMapComponent implements AfterViewInit {
  icons!: [
    {
      iconUrl: 'caminho/para/sua/imagem.png';
      iconSize: [50, 50];
      iconAnchor: [25, 50];
      popupAnchor: [0, -50];
    },
  ];

  map!: leaflet.Map;

  initMap(): void {
    this.map = leaflet.map('map', {
      center: [-12.968771962612362, -38.459164029077826],
      zoom: 18,
    });
  }

  ngAfterViewInit(): void {
    this.initMap();

    leaflet
      .tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      })
      .addTo(this.map);

    leaflet
      .marker([-12.968771962612362, -38.459164029077826])
      .addTo(this.map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.');
  }
}
