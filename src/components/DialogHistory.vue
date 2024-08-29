<template>
<q-dialog v-model="dialog">
  <q-card style="width: 550px;">
    <q-timeline layout="dense">
      <q-timeline-entry
        v-for="(entry, index) in groupedData"
        :key="index"
        :title="entry.date"
      >
        <template v-for="(item, key) in entry.entries" :key="key">
          <div>Horário: {{ item.time }}</div>
        </template>
      </q-timeline-entry>
    </q-timeline>
    <q-card-actions align="right">
      <q-btn flat label="fechar" color="negative" v-close-popup @click="dialog = false" />
    </q-card-actions>
  </q-card>
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

    console.log(groupedData);
  }
})
</script>

<style lang="scss" scoped>
.q-timeline-entry {
  margin-bottom: 20px;
}
</style>
