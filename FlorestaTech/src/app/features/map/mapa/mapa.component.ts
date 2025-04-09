import { Component, OnInit } from '@angular/core';

// RXJS
import { Subject } from 'rxjs';

// Mapa Leaflet;
import * as L from 'leaflet';

// Services
import { DataServiceService } from 'src/app/shared/services/data-service.service';

// Ngx Bootstrap
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

// COmponentes
import { RelatoriosComponent } from '../relatorios/relatorios.component';

// Models
import { equipamentModel } from 'src/app/shared/models/equipament.models';
import { equipamentDetailModel } from 'src/app/shared/models/equipamentDetail.model';
import { equipmentDataModel } from 'src/app/shared/models/equipmentDataModel.model';
import { equipmentListGoupModel } from 'src/app/shared/models/equipmentListGoup.model';
import { equipmentPositionHistoryModel } from 'src/app/shared/models/equipmentPositionHistory.model';
import { equipamentStateModel } from 'src/app/shared/models/equipmentState.model';
import { equipmentStateHistoryModel } from 'src/app/shared/models/equipmentStateHistory.model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  /**
   * Propriedades da classe.
   */
  map!: L.Map;
  markers: L.Marker[] = [];
  polylines: L.Polyline[] = [];
  polylinesGenerated: boolean = false;
  allDataEquipaments!: equipamentDetailModel;
  equipamentsGroup!: equipmentListGoupModel[];
  equipamentsGroupTemp!: equipmentListGoupModel[];
  listEquipaments!: equipamentModel[];
  equipamentSelect: equipamentModel | any = '';
  listModelEquipaments!: equipmentDataModel[];
  listModelEquipamentsSelect: equipamentModel | any = '';
  listStateEquipaments!: equipamentStateModel[];
  listStateEquipamentstSelect: equipamentModel | any = '';

  /**
   * variáveis do Modal.
   */
  modalRef!: BsModalRef;
  modalParams: any;
  config = {
    keyboard: false,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-xl',
  };

  constructor(
    private dataServiceService: DataServiceService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getEquipment();
    this.getModelEquipament();
    this.getStateEquipament();
    this.getEquipamentFullDetail();
  }

  // Pegando a listagem de Equipamentos.
  getEquipment() {
    this.listEquipaments = [];

    this.dataServiceService.getDadosEquipaments().subscribe({
      next: (res: equipamentModel[]) => {
        res.forEach((el) => {
          this.listEquipaments.push(el);
        });
      },
    });
  }

  // Pegando a listagem de Modelos.
  getModelEquipament() {
    this.listModelEquipaments = [];

    this.dataServiceService.getDadosEquipamentModel().subscribe({
      next: (res: equipmentDataModel[]) => {
        res.forEach((el) => {
          this.listModelEquipaments.push(el);
        });
      },
    });
  }

  // Pegando a listagem de Estados.
  getStateEquipament() {
    this.listStateEquipaments = [];

    this.dataServiceService.getDadosEquipamentState().subscribe({
      next: (res: equipamentStateModel[]) => {
        res.forEach((el) => {
          this.listStateEquipaments.push(el);
        });
      },
    });
  }

  getEquipamentFullDetail() {
    this.dataServiceService.getEquipamentFullDetail().subscribe({
      next: (data) => {
        this.allDataEquipaments = data; // Agora os dados estão disponíveis apenas após todas as requisições serem concluídas
        this.group();
        this.initMap();
      },
    });
  }

  group() {
    this.equipamentsGroup = [];
    this.equipamentsGroupTemp = [];

    for (
      let index = 0;
      index < this.allDataEquipaments.equipments.length;
      index++
    ) {
      this.equipamentsGroup?.push({
        id: this.allDataEquipaments.equipments[index].id,
        equipmentModelId:
          this.allDataEquipaments.equipments[index].equipmentModelId,
        name: this.allDataEquipaments.equipments[index].name,
        modelo: {
          name: this.allDataEquipaments.equipmentModels.find(
            (el: equipmentDataModel) =>
              el.id ===
              this.allDataEquipaments.equipments[index].equipmentModelId
          )?.name,
          hourlyEarnings: this.getHourlyEarningsEquipaments(
            this.allDataEquipaments.equipments[index].equipmentModelId
          ),
        },
        positionHitory: this.getPosHistory(
          this.allDataEquipaments.equipments[index].id
        ),
        // state: this.getStateEquipament(this.allDataEquipaments.equipments[index].equipmentModelId),
        stateHistory: this.getStateHistory(
          this.allDataEquipaments.equipments[index].id
        ),
      });
      this.equipamentsGroupTemp = this.equipamentsGroup;
    }
  }

  getHourlyEarningsEquipaments(
    equipmentModelId: string
  ): { state: string; value: number; color: string }[] {
    let earnings: { state: string; value: number; color: string }[] = [];

    this.allDataEquipaments.equipmentModels.forEach(
      (el: equipmentDataModel) => {
        if (el.id === equipmentModelId) {
          for (let index = 0; index < el.hourlyEarnings.length; index++) {
            earnings.push({
              state: this.getNameStateEquipament(
                'state',
                el.hourlyEarnings[index].equipmentStateId
              ),
              value: el.hourlyEarnings[index].value,
              color: this.getNameStateEquipament(
                'color',
                el.hourlyEarnings[index].equipmentStateId
              ),
            });
          }
        }
      }
    );
    return earnings;
  }

  getNameStateEquipament(param: string, equipmentStateId: string): string {
    let value!: string;

    this.allDataEquipaments.equipmentStates.forEach(
      (el: equipamentStateModel) => {
        if (el.id === equipmentStateId) {
          value = param === 'state' ? el.name : el.color;
        }
      }
    );

    return value;
  }

  getPosHistory(id: string): any {
    let positions: any[] = [];

    this.allDataEquipaments.equipmentPositionHistory?.forEach(
      (el: equipmentPositionHistoryModel) => {
        if (el.equipmentId === id) {
          el.positions.forEach((el) => {
            positions.push({
              date: el.date,
              lat: el.lat,
              lon: el.lon,
            });
          });
        }
      }
    );

    return positions;
  }

  getStateHistory(id: string): any {
    let posHistory: any[] = [];

    this.allDataEquipaments.equipmentStateHistory?.forEach(
      (el: equipmentStateHistoryModel) => {
        if (el.equipmentId === id) {
          el.states.forEach((el) => {
            posHistory.push({
              date: el.date,
              equipmentStateId: el.equipmentStateId,
            });
          });
          // posHistory?.push(el.states);
        }
      }
    );

    return posHistory;
  }

  getIdStateHistory(id: string): any {
    let stateId: string = '';

    this.allDataEquipaments.equipmentStateHistory?.forEach(
      (el: equipmentStateHistoryModel) => {
        if (el.equipmentId === id) {
          el.states.forEach((el) => {
            stateId = el.equipmentStateId;
          });
        }
      }
    );

    return stateId;
  }

  initMap(): void {
    /**
     * Corrigir caminho dos ícones globais
     * O angular não estava conseguindo puxar o ícones direto da pasta node_modules.
     * Foi necessário cria uma pastas com os ícones no 'aasets'.
     */
    const iconRetinaUrl = './../../../assets/leaflet/marker-icon-2x.png';
    const iconUrl = './../../../assets/leaflet/marker-icon.png';
    const shadowUrl = './../../../assets/leaflet/marker-shadow.png';

    // Ícones default.
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });

    let index = this.equipamentsGroup[0].positionHitory.length;
    let lat = this.equipamentsGroup[0].positionHitory[index - 1].lat;
    let lon = this.equipamentsGroup[0].positionHitory[index - 1].lon;

    /**
     * Implementando o mapa e defifindo a posição inicial
     * com base no primeiro equipamento da lista em sua pos mais recente.
     */
    this.map = L.map('map', {
      center: [lat, lon], // Coordenadas de Caldas Novas - GO, (Latitude e Longitude).
      zoom: 10, // Nível de zoom
    });

    // Adicionar um tile layer (Google Maps, OpenStreetMap, etc.)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      this.map
    );

    if (!this.polylinesGenerated) {
      this.markerMaps();
    }
  }

  // Adiciona os equipamentos no mapa.
  markerMaps(filterModelOrState?: boolean, param?: string) {
    this.equipamentsGroup = this.equipamentsGroupTemp;

    if (filterModelOrState && param === 'model') {
      this.equipamentsGroup = this.equipamentsGroup.filter(
        (item) => item.modelo.name === this.listModelEquipamentsSelect
      );
    } else if (filterModelOrState && param === 'state') {
      let equipamentsState: equipmentListGoupModel[] = [];

      this.equipamentsGroup?.forEach((element) => {
        let index = element.positionHitory?.length;

        if (
          element.stateHistory[index - 1].equipmentStateId ===
          this.listStateEquipamentstSelect
        ) {
          equipamentsState.push(element);
        }
      });
      this.equipamentsGroup = equipamentsState;
    }

    this.equipamentsGroup?.forEach((equip: equipmentListGoupModel) => {
      let index = equip.positionHitory?.length;
      let latitude = equip.positionHitory[index - 1].lat;
      let longitude = equip.positionHitory[index - 1].lon;

      const hours = String(equip.positionHitory[index - 1].date).substring(
        11,
        16
      );

      const marker = L.marker([latitude, longitude], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${this.getNameStateEquipament(
            'color',
            equip.stateHistory[index - 1].equipmentStateId
          )}; width: 15px; height: 15px; border-radius: 50%;"></div>`,
          iconSize: [15, 15],
        }),
      }).addTo(this.map);

      // Adiciona à lista de marcadores
      this.markers.push(marker);

      marker.bindPopup(
        `<b>${equip.name}</b><br>
        <span>Última posição em: ${new Date(
          equip.positionHitory[index - 1].date
        ).toLocaleDateString()} às ${hours}h</span><br>
        <span>Modelo: ${equip.modelo.name}</span><br>
        Estado:<b>
        <span style="color: ${this.getNameStateEquipament(
          'color',
          equip.stateHistory[index - 1].equipmentStateId
        )};">
          ${this.getNameStateEquipament(
            'state',
            equip.stateHistory[index - 1].equipmentStateId
          )}
        </span></b><br>
        <button type="button" class="btn btn-primary mt-1 p-0 py-1 w-100 trajectory-btn" data-id="${
          equip.id
        }">Histórico de Trajeto</button><br>
        <button type="button" class="btn btn-secondary mt-1 p-0 py-1 w-100 reports-btn"  data-id="${
          equip.id
        }">Histórico de Posições</button>`
      );

      marker.on('popupopen', () => {
        const button = document.querySelector('.trajectory-btn');
        if (button) {
          button.addEventListener('click', () => {
            const equipId = button.getAttribute('data-id');
            this.trajectoryEquipament(equipId);
          });
        }
      });

      marker.on('popupopen', () => {
        const buttonReports = document.querySelector('.reports-btn');
        if (buttonReports) {
          buttonReports.addEventListener('click', () => {
            const equipId = buttonReports.getAttribute('data-id');
            const equipament = this.equipamentsGroupTemp?.find(
              (e) => e.id === equipId
            );
            this.openComponentRelatorios(equipament);
          });
        }
      });
    });
  }

  clearMapElements() {
    this.markers.forEach((m) => this.map.removeLayer(m));
    this.polylines.forEach((p) => this.map.removeLayer(p));
    this.markers = [];
    this.polylines = [];
  }

  openComponentRelatorios(equipament: equipmentListGoupModel | any) {
    // Ordenando para a mais recente.
    equipament.positionHitory.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    equipament.stateHistory.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const initialState = {
      equipament: equipament,
    };

    this.modalParams = Object.assign({}, this.config, {
      initialState,
    });
    this.modalRef = this.modalService.show(
      RelatoriosComponent,
      this.modalParams
    );
    this.modalRef.content.onClose = new Subject<any>();
    this.modalRef.content.onClose.subscribe((res: any) => {
    });
  }

  trajectoryEquipament(equipemantId: string | any) {
    // Limpando os marcadores e linhas anteriores
    this.clearMapElements();

    const equip = this.equipamentsGroup.find((e) => e.id === equipemantId);
    if (equip) {
      const latlngs: L.LatLngExpression[] = [];

      equip.positionHitory.forEach((pos, index) => {
        const latlng: L.LatLngExpression = [pos.lat, pos.lon];
        latlngs.push(latlng);

        // Pegando o estado correspondente da mesma data (se existir)
        const state = equip.stateHistory?.[index];
        const stateColor = this.getNameStateEquipament(
          'color',
          state?.equipmentStateId ?? 1 // valor default se não encontrar
        );

        const hours = String(pos.date).substring(11, 16);

        const marker = L.marker(latlng, {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${stateColor}; width: 15px; height: 15px; border-radius: 50%;"></div>`,
            iconSize: [15, 15],
          }),
        }).addTo(this.map);
        marker.bindPopup(
          `<b>${equip.name}</b><br>
            <span>Posição em: ${new Date(
              pos.date
            ).toLocaleDateString()} às ${hours}h</span><br>
            <span>Modelo: ${equip.modelo.name}</span><br>
            Estado:<b>
            <span style="color: ${this.getNameStateEquipament(
              'color',
              // this.getStateHistory(equip.id)
              this.getIdStateHistory(equip.id)
              // equip. .equipmentStateId
            )};">
              ${this.getNameStateEquipament(
                'state',
                this.getIdStateHistory(equip.id)
              )}
            </span></b><br>
            <button type="button" class="btn btn-secondary mt-1 p-0 py-1 w-100 close-trajectory-btn" data-id="${
              equip.id
            }">Fechar trajeto</button>`
        );

        marker.on('popupopen', () => {
          const button = document.querySelector('.close-trajectory-btn');
          if (button) {
            button.addEventListener('click', () => {
              this.reloadMap();
              // Zerando Filtro
              this.equipamentSelect = '';
              this.listModelEquipamentsSelect = '';
              this.listStateEquipamentstSelect = '';
            });
          }
        });
      });
      this.polylinesGenerated = true;

      const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(this.map);
      this.polylines.push(polyline); // Armazena a linha do trajeto

      this.map.fitBounds(polyline.getBounds()); // Zoom no trajeto
    }
  }

  markerMapsFilter() {
    this.equipamentsGroup = this.equipamentsGroupTemp;
    let equipeSelect: equipmentListGoupModel | any = [];

    equipeSelect = this.equipamentsGroup.find(
      (obj) => obj.id === this.equipamentSelect
    );
    let index = equipeSelect.positionHitory?.length;
    let latitude = equipeSelect.positionHitory[index - 1].lat;
    let longitude = equipeSelect.positionHitory[index - 1].lon;

    const hours = String(equipeSelect.positionHitory[index - 1].date).substring(
      11,
      16
    );

    const marker = L.marker([latitude, longitude], {
      icon: L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${this.getNameStateEquipament(
          'color',
          equipeSelect.stateHistory[index - 1].equipmentStateId
        )}; width: 15px; height: 15px; border-radius: 50%;"></div>`,
        iconSize: [15, 15],
      }),
    }).addTo(this.map);

    // Adiciona à lista de marcadores
    this.markers.push(marker);

    marker.bindPopup(
      `<b>${equipeSelect.name}</b><br>
        <span>Última posição em: ${new Date(
          equipeSelect.positionHitory[index - 1].date
        ).toLocaleDateString()} às ${hours}h</span><br>
        <span>Modelo: ${equipeSelect.modelo.name}</span><br>
        Estado:<b>
        <span style="color: ${this.getNameStateEquipament(
          'color',
          equipeSelect.stateHistory[index - 1].equipmentStateId
        )};">
          ${this.getNameStateEquipament(
            'state',
            equipeSelect.stateHistory[index - 1].equipmentStateId
          )}
        </span></b><br>
        <button type="button" class="btn btn-primary mt-1 p-0 py-1 w-100 trajectory-btn" data-id="${
          equipeSelect.id
        }">Histórico de Trajeto</button><br>
        <button type="button" class="btn btn-secondary mt-1 p-0 py-1 w-100 reports-btn"  data-id="${
          equipeSelect.id
        }">Histórico de Posições</button>`
    );

    marker.on('popupopen', () => {
      const button = document.querySelector('.trajectory-btn');
      if (button) {
        button.addEventListener('click', () => {
          const equipId = button.getAttribute('data-id');
          this.trajectoryEquipament(equipId);
        });
      }
    });

    marker.on('popupopen', () => {
      const buttonReports = document.querySelector('.reports-btn');
      if (buttonReports) {
        buttonReports.addEventListener('click', () => {
          const equipId = buttonReports.getAttribute('data-id');
          const equipament = this.equipamentsGroupTemp?.find(
            (e) => e.id === equipId
          );
          this.openComponentRelatorios(equipament);
        });
      }
    });
  }

  reloadMap() {
    this.polylinesGenerated = false;
    this.map.remove();
    this.initMap();
  }

  loadingMapFilter() {
    if (this.polylinesGenerated) {
      this.map.remove();
      this.initMap();
    }
  }

  /**
   * Filtro de equipamento por nome.
   */
  filterNameEquipament() {
    // Zerando os filtros Estado e Modelo.
    this.listModelEquipamentsSelect = '';
    this.listStateEquipamentstSelect = '';

    // Limpando os marcadores e linhas anteriores.
    this.clearMapElements();
    if (this.equipamentSelect) {
      this.loadingMapFilter();
      this.markerMapsFilter();
    } else {
      this.reloadMap();
    }
  }

  /**
   * Filtro de equipamento por Modelo.
   */
  filterModeloEquipament() {
    // Zerando os filtros Estado e Modelo.
    this.equipamentSelect = '';
    this.listStateEquipamentstSelect = '';

    // Limpando os marcadores e linhas anteriores.
    this.clearMapElements();
    if (this.listModelEquipamentsSelect) {
      this.loadingMapFilter();
      this.markerMaps(true, 'model');
    } else {
      this.reloadMap();
    }
  }

  /**
   * Filtro de equipamento por Estado.
   */
  // equipamentsState: equipmentListGoupModel[] = [];
  filterStateEquipament() {
    // Zerando os filtros Estado e Modelo.
    this.equipamentSelect = '';
    this.listModelEquipamentsSelect = '';

    // // Limpando os marcadores e linhas anteriores.
    this.clearMapElements();
    if (this.listStateEquipamentstSelect) {
      this.loadingMapFilter();
      this.markerMaps(true, 'state');
    } else {
      this.reloadMap();
    }
  }
}
