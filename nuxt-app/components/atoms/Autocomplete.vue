<template>
  <div class="content-select">
    <v-autocomplete
      v-model="equipmentsSelected"
      :items="store.equipments"
      :label="label"
      :item-props="itemProps"
      append-inner-icon="mdi-magnify"
      menu-icon=""
      color="blue-grey-lighten-2"
      variant="solo"
      chips
      closable-chips
      multiple
      clearable
      hide-selected
      auto-select-first
      return-object
    >
      <template #chip="{ props, item }">
        <v-chip
          v-bind="props"
          :color="item.raw.color"
          :text="`${item.raw.name} - ${item.raw.model?.name}`"
          @click:close="handleCloseChip(item.raw.equipmentModelId)"
        />
      </template>

      <template #item="{ props, item }">
        <v-list-item
          v-bind="props"
          :subtitle="item.raw.model.name"
          :title="item.raw.name"
        />
      </template>
    </v-autocomplete>
  </div>
</template>

<script setup lang="ts">
import type { IEquipmentNormalized } from '~/interfaces/equipments.interface';
import { ref, watch } from 'vue';
import { useEventBus } from '@/utils/eventBus.ts';

const { emit } = useEventBus();
const equipmentsSelected = ref<IEquipmentNormalized[]>([]);
const store = useNormalizedData();
const props = defineProps<{
  equipments: IEquipmentNormalized[];
  label: string;
}>();

const { label } = props;

const handleCloseChip = (id: string) => {
  const filtered = equipmentsSelected.value.filter((item) => item.id !== id);
  equipmentsSelected.value = filtered;
};

function itemProps(item: IEquipmentNormalized) {
  return {
    title: item.name,
    subtitle: item.model.name,
  };
}

watch(equipmentsSelected, async () => {
  emit('equipmentsToFilter', equipmentsSelected.value);
});
</script>
