<script setup lang="ts">
import { formatDateTime } from '@/utils';
import Tab from '../Tab.vue';
import { useEquipmentStateStore } from '@/stores/EquipmentStateStore';
import { useLoader } from '@/composables';
import { getEquipmentStateHistory } from '@/services/EquipmentStateHistoryService';
import { Equipment } from '@/types/Equipment';
import { computed, ref } from 'vue';
import { EquipmentStateHistoryItemJson, EquipmentStateHistoryJson } from '@/types/EquipmentStateHistory';
import { EquipmentStateJson } from '@/types/EquipmentState';

const props = defineProps<{ equipment: Equipment }>();

const equipmentStateStore = useEquipmentStateStore();

const historyState = ref<EquipmentStateHistoryJson & { states: Array<{ equipmentState: EquipmentStateJson }> }>();

const [isFetcingHistoryState, fetchHistoryState] = useLoader(async () => {
  const data = await getEquipmentStateHistory(props.equipment);

  if (!data) {
    return;
  }

  historyState.value = {
    ...data,
    states: data.states.map((state) => ({
      ...state,
      equipmentState: equipmentStateStore.equipmentStates.find((es) => es.id === state.equipmentStateId) as EquipmentStateJson,
    }))
  };
});

const orderedHistoryStates = computed(() => {
  if (!historyState.value) {
    return [];
  }

  return [...historyState.value.states].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }) as Array<EquipmentStateHistoryItemJson & { equipmentState?: EquipmentStateJson }>;
});

fetchHistoryState();

</script>

<template>
  <Tab title="Histórico de estados">
    <ul class="flex flex-col gap-4 border border-gray-900 rounded p-2">
      <template v-if="isFetcingHistoryState">
        <li
          v-for="i in 5"
          data-testid="history-state-loader"
          :key="`skeleton-${i}`"
          class="animate-pulse min-w-[180px] h-[50px] bg-gray-300 rounded-md cursor-wait"
        ></li>
      </template>
      <template v-else>
        <li
          v-for="(state, idx) in orderedHistoryStates"
          :key="`state-${idx}`"
          class="p-2 border-b border-gray-500 flex flex-col gap-2"
          :data-testid="`history-state-${state.date}`"
        >
          <p>
            Estado:
            <span
              v-if="state.equipmentState"
              class="py-1 px-2 w-fit rounded font-bold ml-2 text-gray-900"
              :style="{ backgroundColor: state.equipmentState.color }"
            >
              {{ state.equipmentState.name }}
            </span>
          </p>
          <p>
            Atualizado em: <span>{{ formatDateTime(state.date) }}</span>
          </p>
        </li>
      </template>
    </ul>
  </Tab>
</template>