<template>
  <div class="relative">
    <slot name="select"></slot>
    <div id="map" class="absolute top-0 left-0 z-[1] w-[100%]" style="height: 100vh"></div>
    <div
      id="mapOptions"
      class="flex flex-col gap-2 absolute top-0 right-0 z-[50] px-[15px] py-[25px]"
      v-if="$q.screen.gt.md"
    >
      <q-btn icon="layers" color="white" text-color="primary" round @click="showMapTypes">
        <q-tooltip class="bg-primary" anchor="center left" self="center right" :offset="[10, 10]">
          Tipos de Mapa
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script setup>
import { inject, onBeforeMount, onMounted, ref, watch, createApp } from 'vue'
import mapboxgl from 'mapbox-gl'
// import { triggerNegative } from 'src/utils/triggers'
import { useQuasar, Quasar } from 'quasar'
import TypeModalDialog from 'src/components/Map/MapTypeDialog.vue'
import PopupContent from 'src/components/Map/PopupContent.vue'
import { useThemeStore } from 'src/stores/theme'
import { useEquipmentStore } from 'src/stores/equipment'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const $q = useQuasar()
const theme = useThemeStore()
const eqpStore = useEquipmentStore()
const bus = inject('bus')
const layerId = ref($q.dark.isActive ? 'dark' : 'streets')

let map
// let mapMarkers = []
let popup

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      const positions = newData.positions

      map.flyTo({
        center: [positions[positions.length - 1].lon, positions[positions.length - 1].lat],
        zoom: 10,
      })

      reloadFullMap(positions)
    }
  },
)

const getGeojson = (positions) => {
  return {
    type: 'FeatureCollection',
    features: positions.map((pos) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [pos.lon, pos.lat],
      },
      properties: {
        date: pos.date,
        ...eqpStore.equipments.find((item) => item.id == props.data.equipmentId),
      },
    })),
  }
}

const getStyleMap = () => {
  let stylePath
  switch (layerId.value) {
    case 'dark':
      stylePath = 'dark-v11'
      break
    case 'streets':
      stylePath = 'streets-v12'
      break
    case 'night':
      stylePath = 'navigation-night-v1'
      break
    case 'sattelite':
      stylePath = 'satellite-streets-v12'
      break
    default:
      stylePath = 'outdoors-v12'
  }
  return `mapbox://styles/mapbox/${stylePath}`
}

const showMapTypes = () => {
  $q.dialog({
    component: TypeModalDialog,
    componentProps: {
      data: { type: layerId.value },
    },
  }).onOk(({ data }) => {
    setMapStyle(data.type)
  })
}

const setMapStyle = (type) => {
  $q.loading.show()
  layerId.value = type
  map.setStyle(getStyleMap())
  $q.loading.hide()
}

const reloadFullMap = (positions) => {
  map.addSource('markers', {
    type: 'geojson',
    data: getGeojson(positions),
  })
  map.addLayer({
    id: 'marker-layer',
    type: 'circle',
    source: 'markers',
    paint: {
      'circle-radius': 8,
      'circle-color': '#73ab84',
    },
  })
}

onBeforeMount(() => {
  if (theme.storeThemeDataGetter.dark && !$q.dark.isActive) {
    layerId.value = 'dark'
  }
})

onMounted(async () => {
  const positions = props.data.positions

  const { lat, lon } = positions[positions.length - 1]
  const lngLat = [lon, lat]

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: lngLat,
    zoom: 10,
    accessToken: import.meta.env.VITE_MAPBOX_API_KEY,
  })

  popup = new mapboxgl.Popup({
    offset: 5,
    closeOnMove: true,
    closeOnClick: true,
    closeButton: true,
    maxWidth: 'auto',
  }).addTo(map)

  map.addControl(new mapboxgl.NavigationControl(), $q.screen.gt.md ? 'bottom-right' : 'top-left')

  map.on('style.load', async () => {
    map.setFog({})
    reloadFullMap(positions)

    bus.on('changeTheme', () => {
      setMapStyle($q.dark.isActive ? 'dark' : 'streets')
    })
  })

  map.on('load', async () => {
    map.on('click', 'marker-layer', (e) => {
      const coordinates = e.features[0].geometry.coordinates
      const properties = e.features[0].properties
      console.log('🚀 ~ map.on ~ coordinates:', coordinates, properties)

      const mountPoint = document.createElement('div')
      const popupContentApp = createApp(PopupContent, {
        data: properties,
        darkTheme: $q.dark.isActive,
      })

      popupContentApp.use(Quasar, {})
      popupContentApp.mount(mountPoint)

      popup.setLngLat(coordinates).setDOMContent(mountPoint).addTo(map)
    })

    map.on('mouseenter', 'marker-layer', () => {
      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'marker-layer', () => {
      map.getCanvas().style.cursor = ''
    })

    map.on('idle', () => {
      if (!map.getLayer('marker-layer')) {
        console.error('Erro ao carregar layers')
        reloadFullMap(positions)
      }
    })
  })
})
</script>
<style lang=""></style>
