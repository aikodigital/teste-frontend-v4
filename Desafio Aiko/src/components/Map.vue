<script setup lang="ts">
  import { type PropType, ref, watch } from 'vue'
  import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
  import L from 'leaflet'
  import type { Equipment } from '../interface/Imap'

  const props = defineProps({
    maps: {
      type: Object as PropType<Equipment[]>,
      required: true,
    },
    positionCenter: {
      type: Object as PropType<Equipment>,
      required: true,
    },
  })

  const defaultEquipment = ref<Equipment>(props.positionCenter)
  const equipments = ref<Equipment[]>(props.maps)

  const busIcon = L.icon({
    iconUrl: '/caminhao.png',
    iconSize: [30, 45],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  })

  const clawIcon = L.icon({
    iconUrl: 'equipament.png',
    iconSize: [40, 55],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  })

  const harvesterIcon = L.icon({
    iconUrl: 'Harvester.png',
    iconSize: [30, 45],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  })

  const verifyColor = (item: Equipment) => {
    if (item.model.name == 'Caminhão de carga') return busIcon
    if (item.model.name == 'Harvester') return harvesterIcon
    if (item.model.name == 'Garra traçadora') return clawIcon
  }

  watch(props, () => {
    equipments.value = props.maps
  })
</script>

<template>
  <l-map
    style="height: 600px; width: 100%"
    :zoom="9.5"
    :center="[
      defaultEquipment.lastPosition.lat,
      defaultEquipment.lastPosition.lon,
    ]"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <section v-for="item in equipments" :key="item.id">
      >
      <l-marker
        :lat-lng="[item.lastPosition.lat, item.lastPosition.lon]"
        :icon="verifyColor(item)"
      >
        <l-popup>
          <div class="popup-modal">
            <h3>{{ item.name }}</h3>
            <section style="display: flex">
              <p>Status:</p>
              <p class="span-title-state">{{ item.states[0].state.name }}</p>
            </section>
            <span>Histórico de Estados: </span>
            <section class="container-historic-state">
              <section
                v-for="(itemState, index) in item.states"
                :key="index"
                :style="{
                  borderLeft: '4px solid ' + itemState.state.color,
                }"
                class="state-card"
              >
                <span class="state-id"
                  >Data:
                  {{
                    new Date(itemState.date).toLocaleDateString('pt-BR')
                  }}</span
                >
                <span class="state-name">{{ itemState.state.name }}</span>
              </section>
            </section>
          </div>
        </l-popup>
      </l-marker>
    </section>
  </l-map>
</template>
