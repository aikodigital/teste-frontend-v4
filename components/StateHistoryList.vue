<script lang="ts" setup>
const dayjs = useDayjs();

const { setView } = useView();
const { selectedEquipment, setSelectedEquipment } = useSelectedEquipment();

const stateHistory = computed(() => selectedEquipment.value?.stateHistory.toReversed() || []);

const iconName = 'fa6-solid:arrow-left';

function handleShowEquipmentList() {
  setView('equipment');
  setSelectedEquipment(null);
}
</script>

<template>
  <aside class="flex flex-col items-center w-1/4 h-screen p-2 gap-4">
    <div class="flex items-center justify-between w-full">
      <button @click="handleShowEquipmentList">
        <Icon :name="iconName" />
      </button>

      <h2 class="text-2xl font-bold">Histórico de Estados</h2>

      <div class="invisible size-[1em]" />
    </div>

    <div>
      <span>
        Equipamento selecionado:
      </span>

      <EquipmentDetails :equipment="selectedEquipment!" :hide-action="true" />
    </div>

    <ul class="w-full border border-black rounded-lg divide-y-2 divide-black max-h-full overflow-y-auto">
      <li v-for="(state, index) in stateHistory" :key="index" class="p-2 flex gap-4">
        <div class="flex flex-col">
          <span>
            <span class="font-bold">
              Data:
            </span>

            {{ dayjs(state.date).format('DD/MM/YYYY') }}
          </span>

          <span>
            <span class="font-bold">
              Hora:
            </span>

            {{ dayjs(state.date).utc().format('HH:mm:ss') }}
          </span>
        </div>

        <span>
          <span class="font-bold">
            Estado:
          </span>

          <span :class="getCurrentStateClass(state.name)">
            {{ state.name }}
          </span>
        </span>
      </li>
    </ul>
  </aside>
</template>
