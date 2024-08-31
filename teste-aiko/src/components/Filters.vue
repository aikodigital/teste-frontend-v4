<script lang="ts" setup>
import Popover from "@/components/Popover.vue";
import { useEquipmentStateStore } from '@/stores/EquipmentStateStore';
import { useEquipmentModelStore } from '@/stores/EquipmentModelStore';

defineProps<{
  equipmentStateId?: string | null
  equipmentModelId?: string | null
}>();

const equipmentStateStore = useEquipmentStateStore();
const equipmentModelStore = useEquipmentModelStore();

const emit = defineEmits(["update:equipmentStateId", "update:equipmentModelId"]);

function updateFilter(filter: "equipmentStateId" | "equipmentModelId", value: string | null) {
  emit(`update:${filter}`, value);
}

</script>

<template>
  <div class="flex flex-wrap gap-2 max-md:flex-col">
    <Popover>
      <div class="py-1 px-2 rounded-lg bg-blue-300">
        <p>
          Estado de equipamento
        </p>
      </div>

      <template #popover>
        <div class="flex gap-2 flex-wrap">
          <button
            class="py-1 px-2 w-fit rounded font-bold border border-blue-500"
            @click="updateFilter('equipmentStateId', null)"
            :class="{ 'bg-blue-300': !equipmentStateId }"
            data-testid="equipment-state-filter-popover-all-button"
          >
            Todos
          </button>
          <button
            v-for="state in equipmentStateStore.equipmentStates"
            :key="state.id"
            class="py-1 px-2 w-fit rounded font-bold border"
            :style="{
              backgroundColor: equipmentStateId === state.id ? state.color : 'transparent',
              borderColor: state.color
            }"
            @click="updateFilter('equipmentStateId', state.id)"
          >
            {{ state.name }}
          </button>
        </div>
      </template>
    </Popover>

    <Popover>
      <div class="py-1 px-2 rounded-lg bg-blue-300">
        <p>
          Modelo de equipamento
        </p>
      </div>

      <template #popover>
        <div class="flex gap-2 flex-wrap">
          <button
            class="py-1 px-2 w-fit rounded font-bold border border-blue-500"
            @click="updateFilter('equipmentModelId', null)"
            :class="{ 'bg-blue-300': !equipmentModelId }"
            data-testid="equipment-model-filter-popover-all-button"
          >
            Todos
          </button>
          <button
            v-for="model in equipmentModelStore.equipmentModels"
            :key="model.id"
            class="py-1 px-2 w-fit rounded font-bold border border-blue-500"
            @click="updateFilter('equipmentModelId', model.id)"
            :class="{ 'bg-blue-300': equipmentModelId === model.id }"
          >
            {{ model.name }}
          </button>
        </div>
      </template>
    </Popover>
  </div>
</template>