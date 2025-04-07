import { AfterViewInit, Component, input, signal } from '@angular/core';
import * as leaflet from "leaflet";
import { Equipment } from '../../models/Equipment';
@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private leafMap!: leaflet.Map;
  private marker!: leaflet.Marker
  equipment = input.required<Equipment>();
  latd = signal<number>(0);
  longd = signal<number>(0);
  ngAfterViewInit(): void {
    this.latd.set(this.equipment().positions[0].lat);
    this.longd.set(this.equipment().positions[0].lon);
      this.initMap();
  }
  initMap() {
    this.leafMap = leaflet.map('map', {
      center: [this.latd(), this.longd()],
      zoom: 13
    })

    leaflet.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`,{
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.leafMap);

    this.marker = leaflet.marker([this.latd(), this.longd()]).addTo(this.leafMap);
    this.marker.bindPopup(`
      <p>
        <b>${this.equipment().name}</b>
      </p>
      <p>
        <span>Modelo: </span>
        <span>${this.equipment().model.name}</span>
      </p>
      <p>
        <span>Estado mais recente: </span>
        <span style="color: ${this.equipment().mostRecentState?.color}">${this.equipment().mostRecentState?.name}</span>
      </p>
      `
    ).openPopup();
  }
}
