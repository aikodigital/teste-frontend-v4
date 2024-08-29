<script lang="ts" setup>
import { ProgressIndicator, ProgressRoot } from 'radix-vue';

const dayjs = useDayjs();

const { setView } = useView();
const { selectedEquipment, setSelectedEquipment } = useSelectedEquipment();

const dailyPercentages = getDailyStatePercentage(selectedEquipment.value!);
console.log(dailyPercentages);

const iconName = 'fa6-solid:arrow-left';

function getProgressIndicatorClass(stateName: string) {
  const baseClasses = 'rounded-full size-full';

  switch (stateName) {
    case 'Operando':
      return `${baseClasses} bg-operando`;
    case 'Parado':
      return `${baseClasses} bg-parado`;
    case 'Manutenção':
      return `${baseClasses} bg-manutencao`;
    case 'Desconhecido':
      return `${baseClasses} bg-slate-600`;
  }
}

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

      <h2 class="text-2xl font-bold">Produtividade diária</h2>

      <div class="invisible size-[1em]" />
    </div>

    <div>
      <span>
        Equipamento selecionado:
      </span>

      <EquipmentDetails :equipment="selectedEquipment!" :hide-action="true" />
    </div>

    <ul class="w-full border border-black rounded-lg divide-y-2 divide-black max-h-full overflow-y-auto">
      <li v-for="(dailyPercentage, index) in dailyPercentages" :key="index" class="p-2 flex flex-col gap-2">
        <span>
          <span class="font-bold">
            Data:
          </span>

          {{ dayjs(dailyPercentage.date).utc().format('DD/MM/YYYY') }}
        </span>

        <div class="flex flex-col gap-1">
          <span v-for="(state, index) in dailyPercentage.states" :key="index">
            <span class="font-bold">
              {{ state.stateName }}:
            </span>

            {{ `${state.percentage}%` }}

            <ProgressRoot v-model="state.percentage"
              class="relative overflow-hidden bg-slate-300 rounded-full flex-1 h-2">
              <ProgressIndicator :class="getProgressIndicatorClass(state.stateName)"
                :style="`transform: translateX(-${100 - state.percentage}%)`" />
            </ProgressRoot>

          </span>
        </div>
      </li>
    </ul>
  </aside>
</template>
