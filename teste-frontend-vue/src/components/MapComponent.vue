<template>
  <main>
    <GoogleMap
      api-key="AIzaSyDjF9Y16puTo7NHOJ2BvGgC2MvtzDQoX0s"
      :style="{ width: '100%', height: 'calc(100vh - ' + menuHeight + 'px)' }" 
      :center="center"
      :zoom="zoom"
      >
      <Marker 
        v-for="equipment of listEquipmentsObj" 
        :options="{ 
          position: { 
            lat: equipment.actualPosition.lat, 
            lng: equipment.actualPosition.lon 
          },
          icon: equipment.iconMarker 
        }"
        @click="setEquipment(equipment)"
        >
        <InfoWindow 
          :position="{
            lat: equipment.actualPosition.lat, 
            lng: equipment.actualPosition.lon
          }">
          <div class="info-window-container">
            <h3>{{ equipment.name }}</h3>
            <table>
              <tbody>
                <tr>
                  <td><strong>ID:</strong></td>
                  <td>
                    <span>{{ equipment.id }}</span>
                    <a class="btn-copy" @click="copyId(equipment.id)">
                      <i class="pi pi-clone" style="color: slateblue"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td><span class="dot-status" :style="{ color: equipment.actualState?.color }">•</span>{{ equipment.actualState.name }}</td>
                </tr>
                <tr>
                  <td><strong>Modelo:</strong></td>
                  <td>{{ equipment.model.name }}</td>
                </tr>
                <tr>
                  <td><strong>Localização:</strong></td>
                  <td>{{ 'lat: ' + equipment.actualPosition.lat + ', long: ' + equipment.actualPosition.lon }}</td>
                </tr>
                <tr>
                  <td><strong>Ganhos do equipamento:</strong></td>
                  <td>{{ moneyMask(equipment.earnings) }}</td>
                </tr>
              </tbody>
            </table>
            <div class="btn-area">
              <Button label="" @click="openStateHistory()">
                <i class="pi pi-history"></i>
                Ver histórico de estados
              </Button>
              <Button @click="openPositionHistory()">
                <i class="pi pi-map-marker"></i>
                Ver histórico de posições
              </Button>
            </div>
          </div>
        </InfoWindow>
      </Marker>
      <Polyline v-if="isPolylineVisible" :options="polylineOptions"></Polyline>
    </GoogleMap>
    <div class="menu-area" :style="{ height: menuHeight + 'px' }">
      <MenuComponent 
        @selectEquipment="selectEquipment" 
        @setModelFilter="setModelFilter"
        @setStateFilter="setStateFilter"
        :menuHeight="menuHeight" 
        :listEquipments="listEquipments"
        >
      </MenuComponent>
    </div>
  </main>
  <HistoryComponent 
    :equipment="selectedEquipment"
    :isDialogVisible="isModalStateHistoryVisible" 
    @closeModal="closeModalHistory"
    >
  </HistoryComponent>
  <PositionHistoryComponent 
    :equipment="selectedEquipment"
    :isDialogVisible="isModalPositionHistoryVisible" 
    @closeModal="closeModalPositionHistory" 
    @setCenter="setCenter"
    @getPolylinePositions="setPolylinePositions"
    >
  </PositionHistoryComponent>
  <Toast/>
</template>

<script lang="ts">
import { GoogleMap, Marker, InfoWindow, Polyline } from 'vue3-google-map';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import MenuComponent from './MenuComponent.vue';
import HistoryComponent from './StateHistoryComponent.vue';
import PositionHistoryComponent from './PositionHistoryComponent.vue';
import caminhaoPNG from '@/assets/imgs/caminhao-de-carga.png';
import garraTracadoraPNG from '@/assets/imgs/garra traçadora.png';
import harvesterPNG from '@/assets/imgs/harvester.png';
import equipments from "../../../data/equipment.json";
import equipamentModel from "../../../data/equipmentModel.json";
import equipmentPositionHistory from "../../../data/equipmentPositionHistory.json";
import equipmentState from "../../../data/equipmentState.json";
import equipmentStateHistory from "../../../data/equipmentStateHistory.json";
import { ref } from 'vue';

export default {
  name: "MapComponent",
  components: {
    GoogleMap,
    Marker,
    InfoWindow,
    MenuComponent,
    HistoryComponent,
    PositionHistoryComponent,
    Button,
    Toast,
    Polyline
  },
  setup() {

    const menuHeight = ref(250);
    const listEquipments = ref(equipments);
    const listModels = ref(equipamentModel);
    const listPositionHistory = ref(equipmentPositionHistory);
    const states = ref(equipmentState);
    const listStatesHistory = ref(equipmentStateHistory);
    const toast = useToast();
    const flightPlanCoordinates = [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ]

    return {
      toast,
      menuHeight,
      // center,
      listEquipments,
      listModels,
      listPositionHistory,
      states,
      listStatesHistory
    }
  },
  data() {
    return {
      isPolylineVisible: false as boolean,
      listEquipmentsObj: [] as any[],
      zoom: 11,
      center: { lat: -19.126536, lng: -45.947756 } as any,
      selectedEquipment: null as any,
      isModalStateHistoryVisible: false as boolean,
      isModalPositionHistoryVisible: false as boolean,
      polylineOptions: null as any
    }
  },
  methods: {
    openStateHistory() {
      this.isModalStateHistoryVisible = true;
    },
    openPositionHistory() {
      this.isModalPositionHistoryVisible = true;
    },
    closeModalHistory(ev: any) {
      this.isModalStateHistoryVisible = ev;
    },
    closeModalPositionHistory(ev: any) {
      this.isModalPositionHistoryVisible = ev;
    },
    getPolylineObject(equipment: any) {
      return {
        path: this.parseLocalizations(equipment.history),
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
      }
    },
    getStateHistory(equipment: any) {
      const states = this.listStatesHistory.find(history => history.equipmentId == equipment.id)?.states;
      return states?.map((state: any) => {
        return {
          ...state,
          state: this.states.find(st => st.id == state.equipmentStateId)
        }
      })
    },
    getIconMarkerObject(equipment: any) {
      return {
        url: this.getUrlImage(equipment.model.name),
        fillColor: equipment.actualState.color,
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: '#000',
        scaledSize: new google.maps.Size(32, 32)
      };
    },
    getEarnings(equipment: any) {
      let countEarnings = 0;
      let countMaintenance = 0;
      let auxDate: Date = new Date(equipment.stateHistory[0].date);
      equipment.stateHistory.forEach((state: any) => {
        if(state.state.name === "Operando") {
          const date: Date = new Date(state.date);
          const hours = (date.getTime() - auxDate.getTime()) / (1000 * 60 * 60);;
          countEarnings += hours;
          auxDate = date;
        } else if(state.state.name === "Manutenção") {
          const date: Date = new Date(state.date);
          const hours = (date.getTime() - auxDate.getTime()) / (1000 * 60 * 60);;
          countMaintenance += hours;
          auxDate = date;
        } else {
          auxDate = new Date(equipment.stateHistory[0].date);
        }
      });
      const value = (countEarnings * equipment.model.hourlyEarnings[0].value) + (countMaintenance * equipment.model.hourlyEarnings[2].value) 
      return value;
    },
    moneyMask(value: number) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    setModelFilter(ev: any) {
      this.listEquipmentsObj = [];
      if(ev) {
        const listFilteredByModel = this.listEquipments.filter(eq => eq.equipmentModelId === ev.id);
        this.generateEquipmentsObjects(listFilteredByModel);
      } else {
        this.generateEquipmentsObjects(this.listEquipments);
      }
    },
    setStateFilter(ev: any) {
      this.listEquipmentsObj = [];
      if(ev) {
        const filteredEquipments = this.listStatesHistory.filter(state => state.states[state.states.length - 1].equipmentStateId == ev.id);
        console.log(filteredEquipments);
        const listFilteredByState = this.listEquipments.filter(eq => filteredEquipments.some(state => state.equipmentId === eq.id));
        this.generateEquipmentsObjects(listFilteredByState);
      } else {
        this.generateEquipmentsObjects(this.listEquipments);
      }
    },
    setCenter(center: any) {
      this.center = center;
    },
    async copyId(id: string) {
      await navigator.clipboard.writeText(id);
      this.toast.add({ severity: 'success', summary: 'ID copiado!', life: 3000 });
    },
    setEquipment(equipment: any) {
      this.selectedEquipment = equipment;
      this.selectedEquipment.isInfoWindowVisible = true;
      this.isPolylineVisible = false;
      // equipment.isPolylineVisible = true;
    },
    selectEquipment(ev: any) {
      this.center = { lat: ev.actualPosition.lat, lng: ev.actualPosition.lon };
      let equip = this.listEquipmentsObj.find(eq => eq.id === ev.id);
      if (equip) {
        this.selectedEquipment = equip;
        equip.isInfoWindowVisible = true;
      }
    },
    setPolylinePositions(ev: any) {
      this.polylineOptions = ev;
      this.isPolylineVisible = true;
    },
    parseLocalizations(value: any) {
      const mappedLocalizations = value.map((item: any) => {
        return {
          lat: item.lat,
          lng: item.lon
        }
      });
      return mappedLocalizations
    },
    generateEquipmentsObjects(list: any): any {
      list.forEach((equipment: any) => {
        equipment.model = this.listModels.find(model => model.id == equipment.equipmentModelId);
        equipment.history = this.listPositionHistory.find(history => history.equipmentId == equipment.id)?.positions;
        equipment.polylineOptions = this.getPolylineObject(equipment);
        equipment.actualPosition = equipment.history[equipment.history.length - 1];
        equipment.stateHistory = this.getStateHistory(equipment);
        const idState = equipment.stateHistory[equipment.stateHistory.length - 1].equipmentStateId;
        equipment.actualState = this.states.find(state => state.id == idState);
        equipment.isInfoWindowVisible = false;
        equipment.iconMarker = this.getIconMarkerObject(equipment);
        equipment.isPolylineVisible = false;
        equipment.earnings = this.getEarnings(equipment);
        this.listEquipmentsObj.push(equipment);
      });
    },
    getUrlImage(name: string) {
      switch(name) {
        case "Caminhão de carga": return caminhaoPNG;
        case "Harvester": return harvesterPNG;
        case "Garra traçadora": return garraTracadoraPNG;
      }
    }
  },
  async mounted() {
    setTimeout(() => this.generateEquipmentsObjects(this.listEquipments), 500);
  },
}

</script>

<style scoped>
main {
  height: 100vh;
  position: relative;
}
table tr td {
  margin-right: 5px;
  font-size: 14px;
  /* display: flex;
  align-items: center; */
} 
.dot-status {
  font-size: 14px;
  text-shadow: 0 0 5px currentColor;
  margin-right: 5px;
}
.menu-area {
  width: -webkit-fill-available;
  position: absolute;
  overflow-y: scroll;
  left: 0;
  bottom: 0;
}
.info-window-container {
  color: black;
  min-width: 200px;
}
.btn-area {
  margin-top: 10px;
  border-top: 1px solid #d6d6d6;
  padding-top: 10px;
}
.btn-area button {
  color: white;
  margin: 0 2.5px;
}
.btn-copy {
  margin: 0 5px;
}
.btn-copy:hover {
  cursor: pointer;
}
</style>

