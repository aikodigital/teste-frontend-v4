<template>
  <q-card-section class="flex flex-col gap-3 w-full">
    <q-expansion-item
      class="shadow-1 overflow-hidden rounded-3xl w-full"
      header-class="bg-accent text-primary"
      expand-icon-class="text-white"
      icon="bi-funnel-fill"
      label="Filtros"
      default-opened
      :dense="$q.screen.lt.md"
    >
      <q-form class="w-full">
        <q-card>
          <q-card-section
            class="grid grid-cols-1 lg:grid-cols-4 items-center justify-center gap-3 w-full"
          >
            <q-select
              color="primary"
              v-model="filters.equipment"
              :options="optionsEquipment"
              label="Equipamento"
              outlined
              dense
              @update:model-value="updateHistory"
            />
            <q-select
              color="primary"
              v-model="filters.state"
              :options="optionsState"
              label="Estado"
              outlined
              dense
              @update:model-value="updateHistory"
            />
          </q-card-section>
        </q-card>
      </q-form>
    </q-expansion-item>
    <q-table
      bordered
      class="w-full"
      table-header-class="bg-secondary text-white"
      :rows="lstShow"
      row-key="id"
      :columns="columns"
      v-model:pagination="pagination"
      rows-per-page-label="Estados por página:"
      no-data-label="Não há dados disponíveis"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ date.formatDate(props.row.date, 'DD/MM/YYYY - HH:mm:ss ') }}
          </q-td>
          <q-td key="state" :props="props">
            <div class="flex flex-nowrap items-center gap-3">
              <q-icon
                name="bi-circle-fill"
                :style="{ color: getState(props.row.equipmentStateId).color }"
              />
              {{ getState(props.row.equipmentStateId).name }}
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-card-actions align="right">
      <q-btn @click="$router.back()" label="Voltar" color="primary" push />
    </q-card-actions>
  </q-card-section>
</template>
<script setup>
import { useEquipmentStore } from 'src/stores/equipment'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { date } from 'quasar'

const eqpStore = useEquipmentStore()
const route = useRoute()

const defaultOptions = {
  label: 'Selecione',
  value: null,
}

const optionsEquipment = ref([
  defaultOptions,
  ...eqpStore.equipments.map((equipment) => ({
    label: equipment.name,
    value: equipment.id,
  })),
])

const optionsState = ref([
  defaultOptions,
  ...eqpStore.states.map((state) => ({
    label: state.name,
    value: state.id,
  })),
])

const filters = ref({
  equipment: optionsEquipment.value.find((item) => item.value == route.params.id),
  state: optionsState.value[0],
})
const lstHistory = ref([])
const pagination = ref({
  rowsPerPage: 10,
})
const columns = [
  {
    name: 'date',
    label: 'Data',
    align: 'left',
  },
  {
    name: 'state',
    label: 'Estado',
    align: 'left',
  },
]

const getState = computed(() => {
  return (id) => eqpStore.states.find((item) => item.id == id)
})

const lstShow = computed(() =>
  filters.value.state.value
    ? lstHistory.value.filter((item) => item.equipmentStateId == filters.value.state.value)
    : lstHistory.value,
)

const updateHistory = () => {
  lstHistory.value = eqpStore.history.find(
    (item) => item.equipmentId == filters.value.equipment.value,
  ).states
}

onMounted(() => {
  updateHistory()
})
</script>
<style lang=""></style>
