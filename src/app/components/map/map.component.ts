import { AfterViewInit, Component } from '@angular/core';
import { LatLng, Map, marker, Marker, tileLayer } from 'leaflet';
import { DataService } from '../../services/data.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapService]
})
export class MapComponent implements AfterViewInit {
  map: Map | undefined;

  constructor(private dataService: DataService, private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.initMap();  // Chama a função para inicializar o mapa
  }

  private initMap(): void {
    // Inicializa o mapa com uma localização e zoom padrão
    this.map = new Map('map').setView(new LatLng(-23.55052, -46.633308), 10);

    // Adiciona a camada de tiles do OpenStreetMap
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Carrega os equipamentos e suas posições
    this.dataService.equipmentPositionsSignal.subscribe(positionHistories => {
      positionHistories.forEach(positionHistory => {
        const latestPosition = this.mapService.getLatestPosition(positionHistory);
        if (latestPosition) {
          // Adiciona o marcador para cada equipamento
          const equipmentMarker: Marker = marker([latestPosition.lat, latestPosition.lon]).addTo(this.map!);

          // Pega o estado mais recente do equipamento
          this.dataService.equipmentStateHistorySignal.subscribe(statesHistory => {
            const latestState = this.mapService.getEquipmentLatestState(positionHistory.equipmentId, statesHistory);
            equipmentMarker.bindPopup(`Equipamento: ${positionHistory.equipmentId}<br>Estado Atual: ${latestState}`);
          });

          // Evento de clique no marcador para mostrar o histórico
          equipmentMarker.on('click', () => this.viewEquipmentHistory(positionHistory.equipmentId));
        }
      });
    });
  }

  private viewEquipmentHistory(equipmentId: string): void {
    // Função para exibir o histórico de estados
    alert(`Exibindo histórico de estados do equipamento: ${equipmentId}`);
  }
}
