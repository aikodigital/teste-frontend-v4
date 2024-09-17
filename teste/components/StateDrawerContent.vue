<template>
  <div
    v-for="state in states"
    :key="state.id"
    class="border-gray-200 border-b-solid border-b-2"
  >
    <h3 class="mb-2">
      {{ state.date }}
    </h3>
    <Tag
      class="text-white mb-4"
      :style="`background-color: ${state.stateColor};`"
      :value="state.stateName"
      rounded
    />
  </div>
</template>

<script setup>
const props = defineProps({
  stateHistory: Array,
})

const store = useMyEquipmentStore()
const { equipmentState } = storeToRefs(store)

function getStringDate(dateString) {
  const dateTime = new Date(dateString)

  const date = dateTime.toLocaleDateString('pt-BR')

  const time = dateTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return `${date} ${time}`
}

const states = computed(() => {
  return props.stateHistory.map((item) => {
    const date = getStringDate(item.date)
    const state = equipmentState.value.find(state => state.id == item.equipmentStateId)
    return {
      id: item.equipmentId,
      date: date,
      stateName: state.name,
      stateColor: state.color,
    }
  })
})
</script>
