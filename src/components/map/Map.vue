<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

import Map from 'ol/Map.js'
import View from 'ol/View.js'
import OSM from 'ol/source/OSM.js'
import Feature from 'ol/Feature.js'
import Point from 'ol/geom/Point.js'
import LineString from 'ol/geom/LineString'
import { Icon, Style } from 'ol/style.js'
import Overlay from 'ol/Overlay.js'
import { Vector as VectorSource } from 'ol/source.js'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { fromLonLat } from 'ol/proj.js'
import { Pointer as PointerInteraction, defaults as defaultInteractions } from 'ol/interaction.js'

const emit = defineEmits(['clickEquipment'])

const olMapInstance = ref<Map>()
const mapElement = ref()
const mapTooltip = ref()
const selectedEquipment = ref<Equipment>()

const projection = 'EPSG:4326'
const centerCoord = [-45.988866, -19.146536]
const zoom = 11

const tileLayer = new TileLayer({
  source: new OSM()
})

const equipmentTooltipData = computed(() => {
  return {
    name: selectedEquipment.value?.name,
    stateName: selectedEquipment.value?.stateHistory[0].name,
    stateColor: selectedEquipment.value?.stateHistory[0].color
  }
})

const createEquipmentPath = (equipment: Equipment) => {
  const coords = []

  for (let index = 0; index < equipment.positionHistory.length; index++) {
    const position = equipment.positionHistory[index]

    coords.push([position.lon, position.lat])
  }

  const lineFeature = new Feature(new LineString(coords))

  return lineFeature
}

const createEquipmentFeature = (equipment: Equipment) => {
  const lastEquipmentPosition = equipment.positionHistory[0]

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 0],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      src: `src/assets/img/${equipment.model.img}`,
      height: 32,
      width: 32
    })
  })

  const iconFeature = new Feature({
    geometry: new Point(fromLonLat([lastEquipmentPosition.lon, lastEquipmentPosition.lat], projection)),
    equipment
  })

  iconFeature.setStyle(iconStyle)

  return iconFeature
}

const createMap = () => {
  const overlay = new Overlay({
    element: mapTooltip.value,
    autoPan: {
      animation: {
        duration: 250
      }
    }
  })

  olMapInstance.value = new Map({
    interactions: defaultInteractions().extend([new PointerInteraction({})]),
    layers: [tileLayer],
    overlays: [overlay],
    target: 'mapElement',
    view: new View({
      center: fromLonLat(centerCoord, projection),
      zoom,
      projection: projection
    })
  })

  const handleCloseMapTooltip = () => {
    overlay.setPosition(undefined)

    selectedEquipment.value = undefined

    const targetElement = olMapInstance.value?.getTargetElement()

    targetElement!.style.cursor = ''

    return false
  }

  olMapInstance.value.on('singleclick', function (event) {
    const feature = olMapInstance.value?.forEachFeatureAtPixel(event.pixel, function (feature) {
      return feature
    })

    if (!feature) {
      handleCloseMapTooltip()
      return
    }

    selectedEquipment.value = feature.get('equipment')

    emit('clickEquipment', selectedEquipment.value)
  })

  olMapInstance.value.on('pointermove', function (event) {
    const feature = olMapInstance.value?.getFeaturesAtPixel(event.pixel)[0]

    if (!feature) {
      handleCloseMapTooltip()
      return
    }

    if (feature.getGeometry()?.getType() == 'LineString') {
      return
    }

    const coordinate = feature.getGeometry()?.getCoordinates()

    selectedEquipment.value = feature.get('equipment')

    const targetElement = olMapInstance.value?.getTargetElement()

    targetElement!.style.cursor = 'pointer'

    overlay.setPosition(coordinate)
  })
}

const updateMap = (equipmentList: Equipment[]) => {
  const features: Feature[] = []

  for (let index = 0; index < equipmentList.length; index++) {
    features.push(createEquipmentFeature(equipmentList[index]))
  }

  const vectorSource = new VectorSource({
    features
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource
  })

  olMapInstance.value?.setLayers([tileLayer, vectorLayer])
}

const drawPositionHistory = (equipment: Equipment) => {
  const features: Feature[] = []

  features.push(createEquipmentPath(equipment))

  const vectorSource = new VectorSource({
    features
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource
  })

  olMapInstance.value?.setLayers([tileLayer, vectorLayer])
}

onMounted(() => {
  createMap()
})

defineExpose({
  updateMap,
  drawPositionHistory
})
</script>

<template>
  <div>
    <div
      id="mapElement"
      ref="mapElement"
    ></div>
    <div
      ref="mapTooltip"
      class="map-tooltip"
    >
      <template v-if="selectedEquipment">
        <div class="font-bold">
          <span>{{ equipmentTooltipData.name }}</span>
          <span
            class="ml-2"
            :style="{ color: equipmentTooltipData.stateColor }"
          >
            {{ equipmentTooltipData.stateName }}
          </span>
        </div>
        <small>Clique para mais detalhes</small>
      </template>
    </div>
  </div>
</template>

<style scoped>
#mapElement {
  max-height: 95dvh;
  height: 100dvh;
}

.map-tooltip {
  position: absolute;
  bottom: 4px;
  left: -125px;
  padding: 0.875rem;
  border: 1px solid var(--p-gray-500);
  border-radius: 10px;
  background-color: var(--p-surface-50);
  color: var(--p-neutral-900);
  min-width: 250px;
}
</style>
