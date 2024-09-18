<template lang="pug">
v-container
    v-row
        v-col(cols="12")
            v-card.pa-2(elevation="0")
                v-card-title.text-md-h4.text-body-1
                    v-icon.text-grey-darken-2.mr-2(icon="mdi-tractor")
                    span.font-weight-bold(data-test-id="index-title") Gestão de Equipamentos Florestais
                v-card-text.text-md-h6.text-body-2
                    | Nesta aplicação, você pode visualizar os equipamentos florestais em operação, monitorar seus estados atuais e acessar o histórico detalhado.

        v-col(cols="12")
            v-card.pa-2(elevation="0")
                v-card-title.text-md-h6.text-body-1 Filtros

                v-row.mt-2(align="center" justify="space-around" wrap)
                    v-col(cols="12" md="4")
                        v-text-field(
                            v-model="searchQuery"
                            label="Pesquisar Equipamento"
                            placeholder="Digite o nome do equipamento"
                            clearable
                            variant="outlined"
                        )
                    v-col(cols="12" md="4")
                        v-select(
                            v-model="selectedState"
                            :items="stateOptions"
                            label="Filtrar por Estado"
                            item-title="text"
                            item-value="value"
                            variant="outlined"
                            clearable
                        )
                    v-col(cols="12" md="4")
                        v-select(
                            v-model="selectedModel"
                            :items="modelOptions"
                            label="Filtrar por Modelo"
                            item-title="text"
                            item-value="value"
                            variant="outlined"
                            clearable
                        )

        v-col(cols="12")
            v-card.pa-4(elevation="0")
                v-card-title 
                    | Equipamentos no Mapa
                v-card-text
                    v-row.mb-2(align="center" justify="start")
                        span.ml-2(data-test-id="equipment-counter") {{filteredEquipments.length || 0}} Equipamento(s) e suas posições mais recentes.
                        v-spacer
                        span.font-weight-bold.ml-2.my-2 Legenda:
                        v-col.hidden-md-and-up.py-0.my-0(cols="12")
                        div.mx-2.my-2(v-for="model in modelOptions" :key="model.value")
                            img(:src="model.icon" width="25px")
                            span {{ model.text }}
                    div.not-prose
                        div.flex.items-center.justify-center.p-5
                            ScriptGoogleMaps(
                                :key="mapKey"
                                ref="maps"
                                :center="query"
                                :markers="[]"
                                api-key="AIzaSyA6POskyPVQKtopuvmmopsKev2UgT6aGaM"
                                class="group"
                                above-the-fold
                                @ready="handleReady"
                                style="width: 100%; height: 600px;"
                            )

                        EquipmentHistoryDialog(
                            :visible="dialogVisible"
                            :equipment="selectedEquipment"
                            @update:visible="closeHistoryDialog"
                        )
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useMainStore } from '../stores/main'

const store = useMainStore()

const searchQuery = ref('') 
const selectedState = ref(null)
const selectedModel = ref(null)

const stateOptions = computed(() => store.equipmentStates.map(state => ({ text: state.name, value: state.id })) || [])
const modelOptions = computed(() => store.equipmentModels.map(model => ({ text: model.name, value: model.id, icon: getRandomIcon() })) || [])

const equipments = ref([])

let iconOptions = [
  'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
]

const filteredEquipments = computed(() => {
    let filtered = equipments.value
  
    if (selectedState.value) {
      filtered = filtered.filter(equipment => store.getEquipmentState(equipment.id)?.id === selectedState.value)
    }
    if (selectedModel.value) {
      filtered = filtered.filter(equipment => store.getEquipmentModel(equipment.equipmentModelId)?.id === selectedModel.value)
    }
  
    if (searchQuery.value) {
      filtered = filtered.filter(equipment => equipment.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    }
  
    return filtered
})

const dialogVisible = ref(false)
const selectedEquipment = ref(null)

const mapKey = ref(0)

const isLoaded = ref(false)
const center = ref(null)
const maps = ref(null)
const markers = ref([])

const query = ref({
    lat: -19.126536,
    lng: -45.947756,
})

onMounted(() => {
    store.loadData()
    equipments.value = store.equipments
})

watch([selectedState, selectedModel, searchQuery], () => {
    updateMarkers()
    forceReRenderMap()
})


const forceReRenderMap = () => {
  mapKey.value += 1
}

const closeHistoryDialog = () => {
    dialogVisible.value = false
    forceReRenderMap()
} 

const updateMarkers = () => {
    markers.value = []
    filteredEquipments.value.forEach(equipment => {
        const position = getEquipmentPosition(equipment.id)
        createMarker(equipment, position)
    })
    isLoaded.value = true
}

const createMarker = (equipment, position) => {
    const map = maps.value
    const selectedModel = modelOptions.value.find((model) => model.value === equipment.equipmentModelId)
    const icon = selectedModel ? selectedModel.icon : iconOptions[0]
    const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: equipment.name,
            icon: {
                url: icon,
                scaledSize: new google.maps.Size(50, 50)
            }
    })

    const infowindow = new google.maps.InfoWindow({
        content: `
                <div>
                    <h2>${equipment.name}</h2>
                    <h3>
                    <br>Estado: ${getEquipmentState(equipment.id)}
                    <br>Modelo: ${store.getEquipmentModel(equipment.equipmentModelId)?.name}
                    </h3>
                    <br>Clique na marcação para mais detalhes
                </div>
            `
    })

    marker.addListener('mouseover', () => {
        infowindow.open(map, marker)
    })

    marker.addListener('mouseout', () => {
        infowindow.close()
    })

    marker.addListener('click', () => {
        if (dialogVisible.value) { return }
        createPolylineAndMarkers(equipment)
        selectedEquipment.value = equipment
        dialogVisible.value = true
    })
    markers.value.push(marker)
}

const createPolylineAndMarkers = (equipment) => {
  const map = maps.value

  const positions = store.getEquipmentPositionHistory(equipment.id)

  if (positions.length > 1) {
    const path = positions.map(pos => ({
      lat: pos.lat,
      lng: pos.lon
    }))

    const polyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#00008B',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: map
    })

    const bounds = new google.maps.LatLngBounds()
    path.forEach(point => bounds.extend(point))
    map.fitBounds(bounds)

    const selectedModel = modelOptions.value.find((model) => model.value === equipment.equipmentModelId)
    const icon = selectedModel ? selectedModel.icon : iconOptions[0]

    path.forEach((pos, index) => {
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: `Posição ${index + 1}`,
        icon: {
          url: icon,
          scaledSize: new google.maps.Size(40, 40) 
        }
      })

      markers.value.push(marker)
    })
  }
}

const handleReady = ({ map }) => {
    center.value = map.value.getCenter()
    maps.value = map.value
    map.value.addListener('center_changed', () => {
        center.value = map.value.getCenter()
    })
    isLoaded.value = true

    if (filteredEquipments.value.length > 0) {
        updateMarkers()

        const firstEquipmentPosition = getEquipmentPosition(filteredEquipments.value[0].id)
        maps.value.setCenter(firstEquipmentPosition)
    }
}

const getEquipmentPosition = (id) => {
    const position = store.getEquipmentPosition(id)
    return { lat: position?.lat || 0, lng: position?.lon || 0 }
}

const getEquipmentState = (id) => {
    const state = store.getEquipmentState(id)
    return state?.name || 'Desconhecido'
}

const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * iconOptions.length)
  const selectedIcon = iconOptions[randomIndex]
  iconOptions = iconOptions.filter((icon) => icon !== selectedIcon)
  return selectedIcon
}
</script>
  