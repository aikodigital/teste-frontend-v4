<template>
  <LTooltip>
    <Card>
      <template #title>
        {{ marker.name }}: {{ marker.model }}
      </template>
      <template #content>
        <p class="pt-0">
          {{ marker.date }}
        </p>
        <p class="pt-0">
          Lat: {{ marker.position.lat }}, Lon: {{ marker.position.lon }} |
          <Tag
            class="text-white"
            :style="`background-color: ${marker.stateColor};`"
            :value="marker.state"
            rounded
          />
        </p>
      </template>
    </Card>
  </LTooltip>
</template>

<script setup>
const props = defineProps({
  marker: Object,
})

const marker = reactive(props.marker)
</script>
