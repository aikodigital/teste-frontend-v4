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
import { useQuasar, Quasar } from 'quasar'
import TypeModalDialog from 'src/components/Map/MapTypeDialog.vue'
import PopupContent from 'src/components/Map/PopupContent.vue'
import { useThemeStore } from 'src/stores/theme'
import { useRouter } from 'vue-router'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const $q = useQuasar()
const router = useRouter()
const theme = useThemeStore()
const bus = inject('bus')
const layerId = ref($q.dark.isActive ? 'dark' : 'streets')

let map
// let mapMarkers = []
let popup

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      map.flyTo({
        center: [newData.position.lon, newData.position.lat],
        zoom: 10,
      })

      reloadFullMap(newData.position)
    }
  },
)

const getGeojson = () => {
  return {
    type: 'FeatureCollection',
    features: props.data.map((eqp) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [eqp.position.lon, eqp.position.lat],
        },
        properties: {
          data: JSON.stringify(eqp),
          state: eqp.state.id,
        },
      }
    }),
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

const reloadFullMap = () => {
  map.addSource('markers', {
    type: 'geojson',
    data: getGeojson(),
  })
  map.addLayer({
    id: 'marker-layer',
    type: 'circle',
    source: 'markers',
    paint: {
      'circle-radius': 8,
      // 'circle-color': '#73ab84',
      'circle-color': [
        'match',
        ['get', 'state'],
        '0808344c-454b-4c36-89e8-d7687e692d57',
        '#2ecc71',
        'baff9783-84e8-4e01-874b-6fd743b875ad',
        '#f1c40f',
        '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f',
        '#e74c3c',
        '#ccc',
      ],
      'circle-stroke-color': 'white',
      'circle-stroke-width': 1,
      // 'circle-opacity': 0.5,
    },
  })
}

onBeforeMount(() => {
  if (theme.storeThemeDataGetter.dark && !$q.dark.isActive) {
    layerId.value = 'dark'
  }
})

onMounted(async () => {
  const positions = props.data[0].position
  const { lat, lon } = positions
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
    reloadFullMap()

    bus.on('changeTheme', () => {
      setMapStyle($q.dark.isActive ? 'dark' : 'streets')
    })
  })

  map.on('load', async () => {
    map.on('click', 'marker-layer', (e) => {
      const coordinates = e.features[0].geometry.coordinates
      const properties = JSON.parse(e.features[0].properties.data)

      const mountPoint = document.createElement('div')
      const popupContentApp = createApp(PopupContent, {
        data: properties,
        darkTheme: $q.dark.isActive,
      })

      popupContentApp.use(Quasar, {})
      popupContentApp.use(router)
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
        reloadFullMap()
      }
    })
  })
})
</script>
<style lang=""></style>
