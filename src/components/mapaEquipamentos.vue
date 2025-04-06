<script>
  import { Loader } from '@googlemaps/js-api-loader'
  import { mapState } from 'vuex'

import modalHistorico from './modalHistorico'

  export default {
    name: 'EquipmentMap',
    components: {
      modalHistorico
    },
    data() {
      return {
        map: null,
        markers: [],
        infoWindows: [],
        legendStates: [
          { name: 'Operando', color: '#2ecc71' },
          { name: 'Parado', color: '#f1c40f' },
          { name: 'Manutenção', color: '#e74c3c' }
        ],
        showHistoryModal: false,
        equipamento: []
      }
    },
    computed: {
      ...mapState({
        equipments: state => state.equipamentosFiltrados
      }),
      filteredEquipments() {
        return this.equipments.filter(equip => equip.positions && equip.positions.length > 0)
      }
    },
    methods: {
      async initMap() {
        try {
          const loader = new Loader({
            apiKey: "AIzaSyDXVyapti5XpmAMuAFtmnequ8z3VZdEu3M",
            version: "weekly",
            libraries: ["geometry"]
          })

          await loader.load()

          this.map = new window.google.maps.Map(this.$refs.mapContainer, {
            center: { lat: -19.151801, lng: -46.007759 },
            zoom: 10,
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            mapTypeControlOptions: {
              style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: window.google.maps.ControlPosition.TOP_RIGHT
            },
            zoomControlOptions: {
              position: window.google.maps.ControlPosition.RIGHT_CENTER
            }
          })

          this.createMarkers()
          this.fitMapToMarkers()

          window.addEventListener('resize', this.handleResize)

        } catch (error) {
          console.error("Erro ao carregar Google Maps:", error)
        }
      },
      getInfoWindowContent(equipment, lastPosition, lastState) {
        const div = document.createElement('div')
        div.className = 'info-window-content'

        // HTML básico
        div.innerHTML = `
          <h3>${equipment.name}</h3>
          <p><label>Modelo:</label> <strong>${equipment.model?.name || 'N/A'}</strong></p>
          <p><label>Última atualização:</label> <strong>${this.$moment(lastPosition.date).format('DD/MM/YY HH:mm')}</strong></p>
          <p class="pEstadoAtual">
            <label>Estado atual:</label> 
            <span class="legend-color" style="background: ${lastState?.color || '#000'} !important"></span>
            <span class="estadoAtual" style="color: ${lastState?.color || '#000'}">${lastState?.name || 'Desconhecido'}</span>
            <a class="history-btn">+ histórico</a>
          </p>
          <p><label>Coordenadas:</label> <strong>${lastPosition.lat.toFixed(6)}, ${lastPosition.lon.toFixed(6)}</strong></p>
        `

        const button = div.querySelector('.history-btn')
        button.addEventListener('click', () => {
          this.showHistoryModal = true;
          this.equipamento = equipment || []

          if (this.currentInfoWindow) {
            this.currentInfoWindow.close()
          }
        });

        return div
      },
      createMarkers() {
        this.clearMarkers()

        this.filteredEquipments.forEach(equipment => {
          const lastPosition = this.getLastPosition(equipment)
          const lastState = this.getLastState(equipment)

          const marker = new window.google.maps.Marker({
            position: { lat: lastPosition.lat, lng: lastPosition.lon },
            map: this.map,
            title: `${equipment.name} - ${equipment.model.name} - ${lastState?.name || 'Estado desconhecido'}`,
            icon: this.getMarkerIcon(lastState?.color, equipment.model.name),
            equipmentData: equipment
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: this.getInfoWindowContent(equipment, lastPosition, lastState)
          });

          marker.addListener('click', () => {
            this.closeAllInfoWindows();
            infoWindow.open(this.map, marker);
          });

          this.markers.push(marker);
          this.infoWindows.push(infoWindow)
        });
      },

      getLastPosition(equipment) {
        const sortedPositions = [...equipment.positions].sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        );
        return sortedPositions[0];
      },

      getLastState(equipment) {
        if (!equipment.states || equipment.states.length === 0) return null;
        const sortedStates = [...equipment.states].sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        );
        return sortedStates[0].stateInfo
      },

      getMarkerIcon(color = '#FF0000', tipo) {
        let simbolo = 'M 0,-15 15,0 0,15 -15,0 Z'
        const caminhao = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path fill="${color}" d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z" />
        </svg> `)
        const harvester = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="${color}" d="M96 64c0-35.3 28.7-64 64-64L266.3 0c26.2 0 49.7 15.9 59.4 40.2L373.7 160 480 160l0-33.8c0-24.8 5.8-49.3 16.9-71.6l2.5-5c7.9-15.8 27.1-22.2 42.9-14.3s22.2 27.1 14.3 42.9l-2.5 5c-6.7 13.3-10.1 28-10.1 42.9l0 33.8 56 0c22.1 0 40 17.9 40 40l0 45.4c0 16.5-8.5 31.9-22.6 40.7l-43.3 27.1c-14.2-5.9-29.8-9.2-46.1-9.2c-39.3 0-74.1 18.9-96 48l-80 0c0 17.7-14.3 32-32 32l-8.2 0c-1.7 4.8-3.7 9.5-5.8 14.1l5.8 5.8c12.5 12.5 12.5 32.8 0 45.3l-22.6 22.6c-12.5 12.5-32.8 12.5-45.3 0l-5.8-5.8c-4.6 2.2-9.3 4.1-14.1 5.8l0 8.2c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-8.2c-4.8-1.7-9.5-3.7-14.1-5.8l-5.8 5.8c-12.5 12.5-32.8 12.5-45.3 0L40.2 449.1c-12.5-12.5-12.5-32.8 0-45.3l5.8-5.8c-2.2-4.6-4.1-9.3-5.8-14.1L32 384c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l8.2 0c1.7-4.8 3.7-9.5 5.8-14.1l-5.8-5.8c-12.5-12.5-12.5-32.8 0-45.3l22.6-22.6c9-9 21.9-11.5 33.1-7.6l0-.6 0-32 0-96zm170.3 0L160 64l0 96 32 0 112.7 0L266.3 64zM176 256a80 80 0 1 0 0 160 80 80 0 1 0 0-160zM528 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm0 64c-48.6 0-88-39.4-88-88c0-29.8 14.8-56.1 37.4-72c14.3-10.1 31.8-16 50.6-16c2.7 0 5.3 .1 7.9 .3c44.9 4 80.1 41.7 80.1 87.7c0 48.6-39.4 88-88 88z"/>
        </svg> `)
        const garra = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="${color}" d="M208 64a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM9.8 214.8c5.1-12.2 19.1-18 31.4-12.9L60.7 210l22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7 79.3 33.1 34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2 .4 32.2s-16.3 16.2-27.8 16.2l-256 0c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7l32 0 22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-74.9-60.6-26-37 111c-5.6 16.8-23.7 25.8-40.5 20.2S-3.9 486.6 1.6 469.9l48-144 11-33 32 13.7z"/>
        </svg> `)

        if (tipo === 'Caminhão de carga') simbolo = caminhao
        else if (tipo === 'Harvester') simbolo = harvester
        else if (tipo === 'Garra traçadora') simbolo = garra

        return {
          url: simbolo,
          fillColor: color,
          fillOpacity: 1,
          strokeWeight: 0,
          scaledSize: new window.google.maps.Size(100, 25),
        };
      },
      getEarningsInfo(equipment, state) {
        if (!equipment.model?.hourlyEarnings) return ''

        const earning = equipment.model.hourlyEarnings.find(
          e => e.equipmentStateId === state?.id
        );

        return earning ?
          `<p><strong>Ganho horário:</strong> ${earning.value >= 0 ? '+' : ''}${earning.value}</p>` : ''
      },

      fitMapToMarkers() {
        if (this.markers.length === 0) {
          this.map.setCenter({ lat: -19.151801, lng: -46.007759 })
          this.map.setZoom(10)
          return;
        }

        const bounds = new window.google.maps.LatLngBounds()

        // Adiciona todas as posições ao bounds
        this.markers.forEach(marker => {
          bounds.extend(marker.getPosition())
        })

        // Caso especial para apenas um marcador
        if (this.markers.length === 1) {
          this.map.setCenter(bounds.getCenter())
          this.map.setZoom(14)
        } else {
          this.map.fitBounds(bounds)

          // Define um zoom máximo para não ficar muito distante
          const maxZoom = 15;
          if (this.map.getZoom() > maxZoom) {
            this.map.setZoom(maxZoom);
          }

          window.google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
            if (this.map.getZoom() > maxZoom) {
              this.map.setZoom(maxZoom)
            }
          })
        }
      },

      clearMarkers() {
        this.markers.forEach(marker => marker.setMap(null))
        this.infoWindows.forEach(window => window.close())
        this.markers = []
        this.infoWindows = []
      },

      closeAllInfoWindows() {
        this.infoWindows.forEach(window => window.close())
      },

      centerMap() {
        this.fitMapToMarkers()
      },

      handleResize() {
        if (this.map) {
          window.google.maps.event.trigger(this.map, 'resize')
          this.fitMapToMarkers()
        }
      }
    },

    watch: {
      equipments: {
        deep: true,
        handler() {
          if (this.map) {
            this.createMarkers()
            this.fitMapToMarkers()
          }
        }
      }
    },

    mounted() {
      this.initMap()
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
      this.clearMarkers()
    }
  };
</script>

<template>
  <div class="geral">
    <div class="equipment-map-container">
      <div class="row">
        <h2 class="map-title col-lg-6">Rastrear de Equipamentos</h2>
        <div class="map-legend col-lg-6">
          <div v-for="state in legendStates" :key="state.name" class="legend-item">
            <span class="legend-color" :style="{ backgroundColor: state.color }"></span>
            <span class="legend-label">{{ state.name }}</span>
          </div>
        </div>
      </div>

      <div ref="mapContainer" class="map-container"></div>

      <modalHistorico v-if="showHistoryModal" :is-visible="showHistoryModal" :equipamento="equipamento"
        @close="showHistoryModal = false" />
    </div>
  </div>
</template>

<style>
.geral {
  background-color: #f5f5f5;
}
.equipment-map-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.map-title {
  text-align: left;
  margin-bottom: 16px;
  color: #2c3e50;
}
.map-controls {
  gap: 8px;
  margin-bottom: 12px;
}
.map-controls button {
  padding: 8px 12px;
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}
.map-controls button:hover {
  background-color: #3367D6;
}
.map-container {
  height: 550px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
}
.map-legend {
  justify-content: right;
  gap: 20px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.legend-item {
  display: flex;
  float: right;
  margin-left: 20px;
  align-items: center;
  gap: 6px;
}
.legend-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ddd;
}
.legend-label {
  font-size: 14px;
  color: #555;
}
.info-window {
  font-family: Arial, sans-serif;
  padding: 12px;
  min-width: 250px;
  max-width: 300px;
}
.info-window h3 {
  margin-top: 0;
  margin-bottom: 8px;
  color: #2c3e50;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
}
.info-window p {
  margin: 6px 0;
  font-size: 14px;
  color: #333;
}
.info-window strong {
  color: #2c3e50;
}
.gm-style .info-window-content {
  padding: 0;
  min-width: 250px;
}
.info-window-content p label {
  font-size: 85%;
}
.pEstadoAtual {
  text-align: left;
  vertical-align: center;
}
.pEstadoAtual label {
  line-height: 18px;
}
.pEstadoAtual .legend-color{
  margin-left: 5px;
}
.pEstadoAtual .estadoAtual {
  margin-left: 2px;
}
.history-btn {
  cursor: pointer !important;
  margin-left: auto;
  text-decoration: none;
  font-weight: 400;
  color: #000;
  padding: 2px 5px;
  border: solid 1px #ccc;
  border-radius: 5px;
  background: #ddd;
  float: right;
}
.estadoAtual {
  font-weight: bold;
}
@media (max-width: 768px) {
  .map-container {
    height: 400px;
  }
}
</style>