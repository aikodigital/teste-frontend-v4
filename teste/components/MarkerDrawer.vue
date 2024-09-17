<template>
  <Drawer
    :visible="true"
    position="right"
    :modal="false"
    :dismissable="false"
    class="bg-white"
    pt:mask:style="pointer-events: none !important;"
  >
    <template #closeicon>
      <Button
        size="small"
        text
        @click="$emit('close')"
      >
        X
      </Button>
    </template>
    <template #header>
      <div>
        <h3 class="mt-0 mb-0">
          {{ marker.name }}
        </h3>
        <h4 class="mt-0 mb-4">
          {{ marker.model }}
        </h4>
        <h5 class="my-0 py-0">
          Histórico de Estados:
        </h5>
      </div>
    </template>
    <StateDrawerContent
      :state-history="marker.stateHistory.states"
    />
  </Drawer>
</template>

<script setup>
const props = defineProps({
  marker: Object,
})

const marker = reactive(props.marker)

defineEmits(['close'])
</script>
