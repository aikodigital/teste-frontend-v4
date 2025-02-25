<template>
  <ClientOnly>
    <v-card elevation="3">
      <v-card-item>
        <LMap class="pa-5" style="height: 600px" :zoom="10" :min-zoom="3" :max-zoom="18"
          :center="[center.lat, center.lon]" :use-global-leaflet="true" @ready="onMapReady">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;target='_blank'>OpenStreetMap</a> contributors"
            layer-type="base" name="OpenStreetMap" />

          <LMarker v-for="(eqp, index) in equipments" :key="index"
            :lat-lng="[eqp.position?.lat || defaultLat, eqp.position?.lon || defaultLon]"
            @click="openEquipmentsDetails(eqp)">
            <LIcon>
              <Icon :name="eqp.icon || 'material-symbols-light:location-on'" size="2rem"
                :style="`color: ${eqp.state?.color}`" />
            </LIcon>
            <LTooltip>
              <div class="d-flex flex-column justify-center ga-1 inter">
                <p class="equipment">
                  <span class="equipmentKey">Nome:</span> <span>{{ eqp.name
                  }}</span>
                </p>
                <p class="equipment"><span class="equipmentKey">Modelo:</span> {{ eqp.model?.name }}</p>
                <p class="equipment"><span class="equipmentKey">Data:</span> {{ formatIsoToBrDate(eqp.position?.date)
                }}</p>
                <div class="equipment d-flex align-center justify-start ga-2">
                  <span class="equipmentKey">Status: </span>
                  <span class="d-flex align-center ga-1 font-weight-bold">
                    <Icon name="material-symbols-light:circle" :style="`color: ${eqp.state?.color}`" /><span>{{
                      eqp.state?.name }}</span>
                  </span>
                </div>
                <p class="d-flex align-center justify-start moreDetails font-weight-bold">Clique para mais
                  detalhes</p>
              </div>
            </LTooltip>
          </LMarker>
        </LMap>
      </v-card-item>
    </v-card>
  </ClientOnly>
</template>

<script setup lang="ts">
import leaflet from 'leaflet'
import type { EquipmentResponse } from '@dtos/Equipment';

interface Props {
  equipments: EquipmentResponse[]
}
const props = defineProps<Props>()

const emit = defineEmits(['openEquipmentsDetails'])

const defaultLat = -9.54444 // Latitude Apiácas ponto central do Brasil
const defaultLon = -57.4511 // Longitude Apiácas ponto central do Brasil

const center = computed(() => {
  if (!props.equipments) {
    return { lat: defaultLat, lon: defaultLon }
  }
  const equipmentsPosition = props.equipments.map(eqp => eqp.position).filter(pos => pos !== undefined)

  return getCenter(equipmentsPosition)
});

const onMapReady = () => {
  return !!leaflet
}

function openEquipmentsDetails(eqp: EquipmentResponse) {
  emit('openEquipmentsDetails', eqp)
}
</script>

<style scoped></style>