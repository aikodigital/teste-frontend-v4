<template>
  <LFeatureGroup>
    <LMarker
      :lat-lng="marker.position"
      @click="openDrawer(marker.id, marker.position)"
    >
      <LIcon
        :tooltip-anchor="[25, -25]"
        :icon-anchor="isSelected ? [16, 60] : [11, 41]"
        class="relative"
      >
        <div :style="isSelected ? 'filter: drop-shadow(0px 0px 1px dodgerblue);' : ''">
          <div :class="`${props.marker.icon} ${isSelected ? 'text-4xl' : 'text-2xl'}`" />
          <div :class="`i-ph-caret-down-fill ${isSelected ? 'text-4xl text-blue-500' : 'text-2xl'}`" />
        </div>
        <Badge
          v-if="marker.state !== 'Operando'"
          pt:root:class="absolute top-0 right-0 w-[10px] h-[10px] rounded"
          :pt:root:style="`background-color: ${marker.stateColor};`"
        />
      </LIcon>
      <MarkerTooltip :marker="marker" />
      <MarkerDrawer
        v-if="isSelected"
        :marker="marker"
        @close="closeDrawer()"
      />
    </LMarker>
    <PositionMarkers
      v-if="isSelected"
      :positions="marker.positionHistory.positions"
    />
  </LFeatureGroup>
</template>

<script setup>
const props = defineProps({
  marker: Object,
  selectedMarkerId: Number,
})

const emits = defineEmits(['open-drawer'])

const isSelected = computed(() => props.selectedMarkerId == props.marker.id)

function openDrawer(markerId, position) {
  emits('open-drawer', markerId, position)
}

function closeDrawer() {
  emits('open-drawer', null)
}
</script>
