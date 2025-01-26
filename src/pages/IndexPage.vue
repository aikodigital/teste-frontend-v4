<template>
  <q-page>
    <q-card-section class="flex flex-col items-center justify-start gap-3 w-full">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="width: 100%; height: 125px"
        class="pr-[15px]"
      >
        <div class="flex flex-nowrap items-center justify-center gap-3 w-full p-1">
          <q-card
            class="rounded-3xl w-[225px] font-bold text-md text-dark"
            :style="{ backgroundColor: getColorByIndex(idx) }"
            v-for="(equipment, idx) in formHistory"
            :key="equipment.id"
          >
            <q-card-section class="flex flex-col items-center justify-start gap-3 w-full h-[100px]">
              <span class="text-start w-full">
                Name:
                {{ equipment.equipment_name }}
              </span>
              <span class="text-start w-full">
                Last State:
                {{ equipment.last_state }}
              </span>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
      <div class="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-3 w-full">
        <q-card class="rounded-3xl" v-for="(state, idx) in stateCounts" :key="state.name">
          <q-card-section class="flex flex-col items-start justify-between gap-3 w-full h-[150px]">
            <span class="text-xl">
              {{ state.name }}
            </span>
            <div class="flex flex-nowrap items-center justify-start gap-3 w-full">
              <q-icon
                :name="`bi-${idx == 0 ? 'truck' : idx == 1 ? 'sign-stop' : 'wrench-adjustable'}`"
                size="lg"
              />

              <span class="text-3xl font-bold grow">
                {{ state.count }}
              </span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </q-page>
</template>

<script setup>
import { useEquipmentStore } from 'src/stores/equipment'
import { computed, onMounted, ref } from 'vue'
import * as MiddlewareService from 'src/services/MiddlewareService'
import { thumbStyle, barStyle } from 'src/utils/scrollStyle'

const colors = ['#66a182', '#caffb9', '#fcaf58', '#d8d4f2']

const eqpStore = useEquipmentStore()

const formHistory = ref(null)

const stateCounts = computed(() => {
  if (formHistory.value === null) {
    return []
  }

  const stateMap = eqpStore.states.reduce((map, state) => {
    map[state.id] = { name: state.name, count: 0 }
    return map
  }, {})

  formHistory.value.forEach((item) => {
    item.states.forEach((state) => {
      if (stateMap[state.equipmentStateId]) {
        stateMap[state.equipmentStateId].count++
      }
    })
  })

  return Object.values(stateMap)
})

const getColorByIndex = computed(() => (index) => {
  return colors[index % colors.length]
})

onMounted(async () => {
  const response = await MiddlewareService.GetData('equipmentState')
  eqpStore.setState(response)

  const respHistory = await MiddlewareService.GetData('equipmentStateHistory')
  formHistory.value = respHistory.map((item) => {
    return {
      ...item,
      equipment_name: eqpStore.equipments.find((equipment) => equipment.id === item.equipmentId)
        .name,
      last_state: eqpStore.states.find(
        (state) => state.id === item.states[item.states.length - 1].equipmentStateId,
      ).name,
    }
  })
})
</script>
