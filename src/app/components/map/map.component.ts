import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Map, Marker, tileLayer } from 'leaflet';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Equipment } from '../../models/equipment';
import { EquipmentState } from '../../models/equipment-state';
import { PositionHistory } from '../../models/position';
import { StateHistory } from '../../models/state-history';
import { DataService } from '../../services/data.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [CommonModule],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map?: Map;
  private destroy$ = new Subject<void>();
  private markers: Marker[] = [];

  selectedEquipment: Equipment | null = null;
  selectedStateHistory: { equipmentStateId: string; date: string }[] = [];

  constructor(private dataService: DataService, private mapService: MapService) {}

  ngOnInit(): void {
    this.loadData(); // Carrega os dados
  }

  ngAfterViewInit(): void {
    this.initMap(); // Inicializa o mapa
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.map?.remove(); // Remove o mapa ao destruir o componente
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
        if (this.map) {
          this.updateMapMarkers(states, equipments, positions, stateHistory); // Atualiza os marcadores
        }
      });
  }

  private initMap(): void {
    if (!this.map) {
      this.map = new Map('map').setView([-23.55052, -46.633308], 10);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      // Recarrega os marcadores assim que o mapa for inicializado
      this.loadData();
    }
  }

  private updateMapMarkers(
    states: EquipmentState[],
    equipments: Equipment[],
    positions: PositionHistory[],
    stateHistory: StateHistory[]
  ): void {
    this.clearMarkers();

    positions.forEach(position => {
      const latestPosition = this.mapService.getLatestPosition(position);
      if (latestPosition) {
        const equipment = equipments.find(e => e.id === position.equipmentId);
        const newMarker = this.createMarker(latestPosition, equipment, stateHistory, states);
        this.markers.push(newMarker);
        newMarker.addTo(this.map!);
      }
    });
  }
  private createMarker(
    position: { lat: number; lon: number; date: string },
    equipment: Equipment | undefined,
    stateHistory: StateHistory[],
    states: EquipmentState[]
  ): Marker {
    const newMarker = new Marker([position.lat, position.lon]);

    // Busca o último estado do equipamento
    const latestState = this.mapService.getLatestState(equipment?.id!, stateHistory);

    // Mapeia o estado do equipamento pelo id do estado
    const stateDetails = states.find(s => s.id === latestState?.equipmentStateId);

    const stateName = stateDetails?.name || 'Unknown';
    let stateColor = stateDetails?.color || '#000';

    // Define as cores personalizadas para certos estados
    if (stateName === 'Operando') {
      stateColor = '#2ecc71'; // Verde para "Operando"
    } else if (stateName === 'Parado' || stateName === 'Manutenção') {
      stateColor = '#e74c3c'; // Vermelho para "Parado" ou "Manutenção"
    }

    // Verifica se latestState?.date está definido e é válido
    const formattedDate = latestState?.date ? new Date(latestState.date).toLocaleString() : 'Data não disponível';

    // Exibe o resumo no popup
    newMarker.bindPopup(`
      <h3>${equipment?.name || 'Unknown Equipment'}</h3>
      <p>Último estado:
        <span style="color: ${stateColor}; font-weight: bold;">
        ${stateName}</span>
      </p>
      <p>Data: ${formattedDate}</p>
    `);

    // Exibe o histórico completo na barra lateral
    newMarker.on('click', () => this.viewEquipmentHistory(equipment, stateHistory));

    return newMarker;
  }

  getStateColor(equipmentStateId: string): string {
    const state = this.dataService.equipmentStateSignal.value.find(s => s.id === equipmentStateId);
    if (state) {
      if (state.name === 'Operando') {
        return '#2ecc71'; // Verde para "Operando"
      } else if (state.name === 'Parado' || state.name === 'Manutenção') {
        return '#e74c3c'; // Vermelho para "Parado" ou "Manutenção"
      }
    }
    return '#000'; // Preto para outros estados
  }



  private viewEquipmentHistory(equipment: Equipment | undefined, stateHistory: StateHistory[]): void {
    // Limpa a seleção anterior e exibe os novos dados
    if (this.selectedEquipment?.id !== equipment?.id) {
      this.selectedEquipment = equipment || null;
      const equipmentHistory = stateHistory.find(history => history.equipmentId === equipment?.id);
      this.selectedStateHistory = equipmentHistory?.states || [];
    }
  }

  getStateName(equipmentStateId: string): string {
    const state = this.dataService.equipmentStateSignal.value.find(s => s.id === equipmentStateId);
    return state ? state.name : 'Unknown';
  }

  private clearMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }
}
