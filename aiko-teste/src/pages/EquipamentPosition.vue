<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="goBack" />
        <q-toolbar-title>Localização dos equipamentos</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md bg-page">
        <div class="map-wrapper">
          <div id="map" class="map-container"></div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = ref(null)
const equipmentData = ref([])
const positionData = ref([])
const initializeMap = () => {
  map.value = L.map('map').setView([51.505, -0.09], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',).addTo(map.value)
}

const updateMapWithEquipment = () => {
  positionData.value.forEach(entry => {
    const equipment = equipmentData.value.find(e => e.id === entry.equipmentId)
    if (equipment) {
      entry.positions.forEach(position => {
        L.marker([position.lat, position.lon])
          .bindPopup(`<b>${equipment.name}</b><br>Data: ${position.date}`)
          .addTo(map.value)
      })
    }
  })
}

const loadData = async () => {
  try {
    const equipmentResponse = await fetch('/data/equipment.json')
    equipmentData.value = await equipmentResponse.json()

    const positionResponse = await fetch('/data/equipmentPositionHistory.json')
    positionData.value = await positionResponse.json()

    updateMapWithEquipment()
  } catch (error) {
    console.error('Erro ao carregar os dados', error)
  }
}

onMounted(() => {
  initializeMap()
  loadData()
})

const router = useRouter()
const goBack = () => {
  router.push({ path: '/' }) // Navega de volta para a página inicial (IndexPage)
}
</script>

<style scoped>
.bg-page {
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.map-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 400px;
  max-width: 500px;
  margin: auto;
}

.map-container {
  height: 500px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.back-button {
  width: 150px;
}
</style>
