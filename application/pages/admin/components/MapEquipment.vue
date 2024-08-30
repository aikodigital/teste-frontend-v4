<template>
  <div class="w-full h-full relative z-10">
    <VMap :center="position" :zoom="11">
      <VMapGoogleTileLayer />
      <VMapZoomControl />
      <VMapDivMarker
        v-for="(pos, index) in history"
        :key="index"
        :latlng="[pos.lat, pos.lon]"
        @mouseover="displayPositionCard = index"
        @mouseout="displayPositionCard = -1"
        @click="displayPositionCard = index"
      >
        <VMapDivIcon>
          <div class="relative w-[35px]">
            <div
              class="card-hover-map"
              :class="{ 'hidden': displayPositionCard !== index }"
              :style="{'border-color': getState(pos.stateId).color }"
            >
              <div class="py-2 px-4 text-slate-600">
                <div >
                  <div class="flex flex-row items-center">
                    <PhosphorIconCalendarDots
                      weight="thin"
                      :color="`${ getState(pos.stateId).color || '' }`"
                    />
                    <span class="text-xs ml-1">{{ dateFormatPtBrDay(pos.date) }}</span>
                  </div>

                  <div class="flex flex-row items-center mt-2">
                    <PhosphorIconClockClockwise
                      weight="thin"
                      :color="`${ getState(pos.stateId).color || '' }`"
                    />
                    <span class="text-xs ml-1">{{ dateFormatPtBrHour(pos.date) }}</span>
                  </div>
                  <span
                    class="text-xs inline-block py-[2px] px-3 rounded-full mt-1 text-white"
                    :style="{'background-color': getState(pos.stateId).color }"
                  >
                    {{ getState(pos.stateId).name }}
                  </span>
                </div>
              </div>
            </div>
            <div class="map-pin">
              <div class="map-pin-circle" />
              <PhosphorIconMapPin
                size="40"
                weight="fill"
                :color="`${ getState(pos.stateId).color || '' }`"
                class="relative z-0"
              />
            </div>
          </div>
        </VMapDivIcon>
      </VMapDivMarker>
    </VMap>
  </div>
</template>

<script setup lang="ts">
import type PositionHistoryWithStateId from '~/interfaces/admin/equipment/PositionHistoryWithState'
import type { LatLng, LatLngTuple } from 'leaflet'
import getStateSelected from '~/interfaces/admin/equipment/GetStateSelected'
import moment from 'moment'

const props = defineProps<{
  equipmentId?: string,
  equipmentName?: string
}>()

const position = ref<LatLngTuple | LatLng> ([-19.167338, -46.00347])
const history = ref<PositionHistoryWithStateId[]>([])
const displayPositionCard = ref<number>(-1)

watchEffect(async () => {
  if(props.equipmentId) {
    
    const data = await $fetch(
      `/api/equipment/${props.equipmentId }/position-history`,
    )

    history.value = data || []
    position.value = [history.value[0].lat, history.value[0].lon]
  }
})

const getState = (stateId: string) => {
  return getStateSelected(stateId)
}

const dateFormatPtBrDay = (date: string) => {
  return moment(date).format('DD/MM/YYYY')
}

const dateFormatPtBrHour = (date: string) => {
  return moment(date).format('HH:mm')
}

</script>

<style scoped>
.card-hover-map {
  @apply
    border-l-4
    absolute
    bottom-[100%]
    left-[17px]
    bg-white
    shadow-md
    rounded-md
    rounded-bl-none
    w-[150px]
    h-auto
}

.map-pin {
  width: 40px;
  height: 40px;
  position: relative;
}

.map-pin-circle {
  @apply
    w-4
    h-4
    rounded-full
    bg-white
    absolute
    z-10
    top-[50%]
    left-[50%]
    -mt-[8px]
    -ml-[8px]
}
</style>  