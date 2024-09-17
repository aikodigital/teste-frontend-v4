<template>
  
  <div id="app">
     <img class="logo" src="./assets/aiko.png" alt="" >

    <h1>Equipamentos</h1>
    <MapLeaflat 
      :equipmentsPositions="equipmentsPositions"
      @equipment-clicked="showEquipmentModal"/>
      <EquipmentModal 
        v-if="isModalOpen"
        :equipment="selectedEquipment"
        @close-modal="closeEquipmentModal"  
      />
 </div>
</template>

<script>
import MapLeaflat from './components/Map.vue'
import EquipmentModal from './components/EquipmentModal.vue'
import dataService from './services/dataService.js'
import equipmentObjectService from '@/services/equipmentObjectService'

export default {
  components: {
        MapLeaflat,
        EquipmentModal
      },
  data() {
    return {
      name: 'App',
      equipmentsPositionHistory: [],
      equipmentsPositions: [],
      isModalOpen: false,
      selectedEquipment: null
    }
  },
  async mounted() {
    await this.loadEquipmentPositionHistory()
  },
  methods: {
    async loadEquipmentPositionHistory() {
      try {
        const data = await dataService.fetchEquipmentPositionHistory()
        this.equipmentsPositionHistory = data
        this.equipmentsPositions = this.getLastPositions()
      } catch(error) {
        console.error('Erro ao carregar o histórico de posições de equipamentos')
      }
    },
   
    getLastPositions() {
      return this.equipmentsPositionHistory.map(equipment => {
        if (equipment.positions && equipment.positions.length > 0) {
          const mostRecentPosition = equipment.positions.reduce((latest, current) => {
            return new Date(current.date) > new Date(latest.date) ? current : latest
          })
          return {
            equipmentId: equipment.equipmentId,
            date: mostRecentPosition.date,
            lat: mostRecentPosition.lat,
            lon: mostRecentPosition.lon
          }
        }
      }).filter(position => position)
    },
    async showEquipmentModal(equipment) {
      this.selectedEquipment = await equipmentObjectService.createdEquipment(equipment.equipmentId)
      this.isModalOpen = true
    },
    closeEquipmentModal() {
      this.isModalOpen = false
      this.selectedEquipment = null;
    },
  }
}
</script>

<style>
@import 'leaflet/dist/leaflet.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  max-width: 5rem;
  float: left;
  margin: 0 10px 20px 10px;
}
</style>