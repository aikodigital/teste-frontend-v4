<template>
  <ClientOnly fallbackTag="div">
   <div id="map">
    <LMap
      ref="map"
      :zoom="6"
      :max-zoom="18"
      :center="[-19.258918, -45.955511]"
      :use-global-leaflet="true"
      @ready="onMapReady"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="Akio Equipamentos"
      />
      <LFeatureGroup>
       <div v-for="item in listaMapa" :key="item.id">
        <LMarker :lat-lng="[item.lat, item.lon]">
          <LTooltip>{{ item.equipament }}</LTooltip>
          <LPopup> Hi! I'm a polygon, nice to meet you! </LPopup>
        </LMarker>
       </div>
      </LFeatureGroup>
    </LMap>
   </div>
 </ClientOnly>
</template>

<script lang="ts">

interface Equipament {
 id: string 
 name: string
 equipmentModelId: string
}
interface HistoryPositions {
  equipmentId: string  
  positions: {
   date: string
   latitude: number
   longitude: number
  }[]
}

interface State {
 id: string
 name: string
 color: string
}

interface StatesHistory {
 equipmentId: string
 states: {
  date: string
  stateId: string
 }[]
}

export default {
 data() {
  return {
   listEquipamentos: [] as Equipament[],
   listaStates: [] as State[],
   listaStatesHistory: [] as StatesHistory[],
   listaMapa: [] as {equipament: string, latitude: number, longitude: number, date: string, atual: string}[],
  }
 },
 methods: {
  async onMapReady() {
   const map = this.$refs.map.leafletObject;

   Promise.all([
    this.listEquipaments(),
    this.lists(),
    this.lists2(),
    this.listPositions(),
   ]).then(() => {
    console.log("...");
   })
  },
  async listPositions() {
   try {
    const response = await fetch("/data/equipmentPositionHistory.json");
    const dados = await response.json();    
    const listaMapa = [];
    dados.forEach((item: HistoryPositions) => {
     const posicao = item.positions.length > 0 ? item.positions.reduce((max, item) => (new Date(item.date) > new Date(max.date) ? item : max), item.positions[0]) : null;
     const equip = this.listEquipamentos.find((equipamento) => equipamento.id === item.equipmentId);

     const posicao2 = this.listaStatesHistory.find((state) => state.equipmentId === equip.id);
     const posicao3 = posicao2.states.find((s) => s.date === posicao.date);
     // const stateName = posicao3.equipmentStateId ? this.listaStates.find((state) => state.id === posicao3.equipmentStateId)?.name : 'Desconhecido';


     console.log("posicao3: ",posicao3)
     console.log("posicao2: ",posicao2)
     console.log("stateshistory: ",this.listaStatesHistory)
     console.log("states: ",this.listaStates)
     console.log("equip: ",equip)

     listaMapa.push({ equipament: equip.name, lat: posicao.lat, lon: posicao.lon, date: posicao.date, atual: "stateName" });
    })
    this.listaMapa = listaMapa;
   } catch (error) {
    console.error("Erro ao carregar dados:", error);
   }
  },
  async listEquipaments() {
   try {
    const response = await fetch("/data/equipment.json");
    const dados = await response.json();
    this.listEquipamentos = dados;
   } catch (error) {
    console.error("Erro ao carregar dados:", error);
    this.listEquipamentos = [];
   }
  },
  async lists() {
   try { 
    const response = await fetch("/data/equipmentStateHistory.json");
    const dados = await response.json();
    this.listaStatesHistory = dados;

    const response2= await fetch("/data/equipmentState.json");
    const dados2 = await response2.json();
    this.listaStates = dados2;
   } catch (error) {
    console.error("Erro ao carregar dados:", error);
    this.listaStatesHistory = [];
    this.listaStates = [];
   }
  },
  async lists2() {
   try { 
    const response= await fetch("/data/equipmentState.json");
    const dados = await response.json();
    this.listaStates = dados;
   } catch (error) {
    console.error("Erro ao carregar dados:", error);
    this.listaStates = [];
   }
  },
 },
 // mounted() {
 //  Promise.all([
 //   this.listEquipaments(),
 //   this.listaState(),
 //   this.listStatesHistory()
 //  ]).then(() => {
 //   this.listPositions()
 //  })
 // }
}
</script>

<style lang="scss">
 #map {
  height: 100vh;
  position: relative;
  z-index: 1;
 }
</style>