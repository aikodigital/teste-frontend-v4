<template>
  <q-dialog v-model="dialog">
    <q-layout container class="dialog">
      <q-header class="row q-pa-md" style="width: 100%; position: fixed;">
        <q-toolbar-title>Histórico</q-toolbar-title>
        <q-btn flat dense icon="close" align="right" v-close-popup @click="dialog = false" />
      </q-header>

      <q-page-container>
        <q-page padding>
          <q-timeline
            layout="loose"
            color="secondary"
            side="right"
          >
            <q-timeline-entry
              v-for="(entry, index) in groupedData"
              :key="index"
              :title="entry.date"
              subtitle="Data da alteração"
              icon="calendar_month"
              side="left"
            >
              <template v-for="(item, key) in entry.entries" :key="key">
                <div class="column">
                  <span><b>Horário:</b> {{ item.time }}</span>
                </div>
                </template>
            </q-timeline-entry>
          </q-timeline>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useEquipmentsStore } from '../stores/equipment.store';

const dialog = ref<boolean>(false);

// Dados da store
const $useEquipmentsStore = useEquipmentsStore();
const listStateHistory = computed(() => $useEquipmentsStore.listEquipmentsStateHistory);

defineExpose({ dialog });

interface TimelineEntry {
  date: string;
  equipmentStateId: string;
}

interface GroupedData {
  date: string;
  entries: { time: string; equipmentStateId: string }[];
}

const groupByDay = (data: TimelineEntry[]): GroupedData[] => {
  return data.reduce((acc: GroupedData[], entry) => {
    const date = new Date(entry.date);
    const day = date.toLocaleDateString('pt-BR');
    const time = date.toISOString().split('T')[1].slice(0, 5);

    let group = acc.find(g => g.date === day);

    if (!group) {
      group = { date: day, entries: [] };
      acc.push(group);
    }

    group.entries.push({ time, equipmentStateId: entry.equipmentStateId });

    return acc;
  }, []);
};

const groupedData = groupByDay(listStateHistory.value);

watch(dialog, async (val) => {
  if (val) {
    await $useEquipmentsStore.getStateHistory();
  }
})
</script>

<style lang="scss" scoped>
.dialog {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #fff;
  width: 800px;
  height: 750px;
  border: 1px solid $secondary;
  border-radius: 10px;
}

@media only screen and (max-width: 499px) {
  .dialog {
    width: 100%;
  }
}
</style>
