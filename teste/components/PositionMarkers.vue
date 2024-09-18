<template>
  <div>
    <LMarker
      v-for="position in positions"
      :key="position.date"
      :lat-lng="[position.lat, position.lon]"
    >
      <LIcon
        v-if="!isCurrentPosition(position)"
        :icon-anchor="[10, 15]"
        class="relative"
      >
        <div class="i-ph-caret-down-fill text-2xl text-black-500 opacity-50" />
      </LIcon>
      <LTooltip>
        <Card>
          <template #title>
            {{ getStringDate(position.date) }}
          </template>
          <template #content>
            Lat: {{ position.lat }}, Lon: {{ position.lon }}
          </template>
        </Card>
      </LTooltip>
    </LMarker>
    <LPolyline
      :lat-lngs="props.positions.map(position => [position.lat, position.lon])"
      color="black"
      weight="1"
      opacity="0.3"
      dash-array="4 4"
    />
  </div>
</template>

<script setup>
const { getStringDate } = useMarkerUtils()

const props = defineProps({
  positions: Array,
})

function isCurrentPosition(position) {
  const lastPosition = props.positions[props.positions.length - 1]
  return position == lastPosition
}
</script>
