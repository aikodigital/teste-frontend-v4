<template>
  <q-page>
    <q-card-section class="flex flex-col items-center justify-start gap-3 w-full">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="width: 100%; height: 140px"
        class="pr-[15px]"
      >
        <div class="flex flex-nowrap items-center justify-center gap-3 w-full p-1">
          <q-card
            class="rounded-3xl w-[225px] font-bold text-md text-dark"
            :style="{ backgroundColor: getColorByIndex(idx) }"
            v-for="(equipment, idx) in formHistory"
            :key="equipment.id"
          >
            <q-card-section class="flex flex-col items-center justify-start gap-3 w-full h-ful">
              <span class="text-start w-full">
                Nome:
                {{ equipment.equipment.name }}
              </span>
              <span class="text-start w-full">
                Modelo:
                {{ equipment.equipment.model }}
              </span>
              <div class="flex flex-nowrap items-center gap-1 w-full">
                <span> Estado: {{ equipment.equipment.state.name }} </span>
                <q-icon name="bi-circle-fill" :style="{ color: equipment.equipment.state.color }" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
      <div class="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-3 w-full">
        <q-card class="rounded-3xl" v-for="(state, idx) in stateCounts" :key="state.name">
          <q-card-section
            class="flex flex-col items-start justify-between gap-3 w-full h-[150px]"
            :style="{ backgroundColor: state.color }"
          >
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
import { thumbStyle, barStyle } from 'src/utils/scrollStyle'

const colors = ['#66a182', '#caffb9', '#fcaf58', '#d8d4f2']

const eqpStore = useEquipmentStore()

const formHistory = ref(null)

const stateCounts = computed(() => {
  if (formHistory.value === null) {
    return []
  }

  const stateMap = eqpStore.states.reduce((map, state) => {
    map[state.id] = { name: state.name, count: 0, color: state.color }
    return map
  }, {})

  eqpStore.equipments.forEach((item) => {
    stateMap[item.state.id].count++
  })

  return Object.values(stateMap)
})

const getColorByIndex = computed(() => (index) => {
  return colors[index % colors.length]
})

onMounted(async () => {
  formHistory.value = eqpStore.history.map((item) => {
    return {
      ...item,
      equipment: {
        ...eqpStore.equipments.find((equipment) => equipment.id === item.equipmentId),
      },
    }
  })
})
</script>
