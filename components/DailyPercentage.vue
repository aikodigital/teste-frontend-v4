<script lang="ts" setup>
/** Core */
import { ProgressIndicator, ProgressRoot } from 'radix-vue';

/** Instância da biblioteca dayJs */
const dayjs = useDayjs();

/** Função para definir a visualização atual. */
const { setView } = useView();

/** Função para recuperar e definir o equipamento selecionado. */
const { selectedEquipment, setSelectedEquipment } = useSelectedEquipment();

/** Dados manipulados para exibição da lista */
const dailyReports = getDailyReport(selectedEquipment.value!);

/**
 * Ícone seta para direita
 * @see https://icones.js.org/collection/fa6-solid?s=arrow&icon=fa6-solid:arrow-left
 */
const iconArrowLeft = 'fa6-solid:arrow-left';

/** Função para retornar a classe do indicador de progresso
 * @param {string} stateName Nome do estado
 * @returns {string} Classe do indicador de progresso
 */
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

/** Função para exibir a lista de equipamentos */
function handleShowEquipmentList() {
  setView('equipment');
  setSelectedEquipment(null);
}
</script>

<template>
  <aside class="flex flex-col items-center w-1/4 h-screen p-2 gap-4">
    <div class="flex items-center justify-between w-full">
      <button @click="handleShowEquipmentList">
        <Icon :name="iconArrowLeft" />
      </button>

      <h2 class="text-2xl font-bold">
        Produtividade diária
      </h2>

      <div class="invisible size-[1em]" />
    </div>

    <div>
      <span>
        Equipamento selecionado:
      </span>

      <EquipmentDetails :equipment="selectedEquipment!" :hide-action="true" />
    </div>

    <ul class="w-full border border-black rounded-lg divide-y-2 divide-black max-h-full overflow-y-auto">
      <li v-for="(dailyReport, index) in dailyReports" :key="index" class="p-2 flex flex-col gap-2">
        <div class="flex justify-between">
          <span>
            <span class="font-bold">
              Data:
            </span>

            {{ dayjs(dailyReport.date).utc().format('DD/MM/YYYY') }}
          </span>

          <span>
            <span class="font-bold">
              Ganhos:
            </span>

            {{ dailyReport.totalEarnings }}
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <span v-for="(percentages, j) in dailyReport.percentages" :key="j">
            <span class="font-bold">
              {{ percentages.stateName }}:
            </span>

            <span>
              {{ dailyReports[index].hours[j].hour }}h - {{ `${percentages.percentage}%` }}
            </span>

            <ProgressRoot v-model="percentages.percentage"
              class="relative overflow-hidden bg-slate-300 rounded-full flex-1 h-2">
              <ProgressIndicator :class="getProgressIndicatorClass(percentages.stateName)"
                :style="`transform: translateX(-${100 - percentages.percentage}%)`" />
            </ProgressRoot>
          </span>
        </div>
      </li>
    </ul>
  </aside>
</template>
