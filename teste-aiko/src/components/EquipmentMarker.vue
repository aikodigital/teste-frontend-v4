<script setup lang="ts">
import { Equipment } from "@/types/Equipment";
import { LIcon, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import { formatDateTime, formatCurrency } from "@/utils/index";
import { computed } from "vue";
import { RequiredFields } from "@/types/Utils";

interface Props {
  equipment: RequiredFields<Equipment, "position">
}

const props = defineProps<Props>();

const hourlyEarning = computed(() => {
  if (!props.equipment.model) {
    return null;
  }

  return props.equipment.model.hourlyEarnings.find((earning) => props.equipment.state?.id === earning.equipmentStateId);
});
</script>

<template>
  <LMarker
    :lat-lng="[equipment.position.lat, equipment.position.lon]"
    :title="equipment.name"
    :alt="equipment.name"
    :name="equipment.name"
    v-on="$attrs"
  >
    <LIcon
      class-name="equipment-marker__icon"
      :icon-size="[20, 20]"
      :icon-anchor="[10, 10]"
    >
      <div
        class="w-fit h-fit rounded p-1"
        data-testid="marker-icon"
        :style="{ backgroundColor: equipment.state?.color }"
      >
        <p
          class="font-semibold"
          data-testid="marker-icon-equipment-name"
        >
          {{ equipment.name }}
        </p>
      </div>
    </LIcon>
    <LTooltip>
      <div
        data-testid="marker-tooltip"
        class="flex flex-col gap-2"
      >
        <p
          class="font-bold text-[16px]"
          data-testid="marker-tooltip-equipment-name"
        >
          Equipamento: {{ equipment.name }}
        </p>
        <p
          v-if="equipment.state"
          data-testid="marker-tooltip-equipment-state-name"
        >
          Estado:
          <span
            class="py-1 px-2 w-fit rounded font-bold ml-2 text-gray-900"
            :style="{ backgroundColor: equipment.state.color }"
          >
            {{ equipment.state.name }}
          </span>
        </p>
        <p
          v-if="equipment.state"
          data-testid="marker-tooltip-equipment-state-date"
        >
          Estado atualizado em: {{ formatDateTime(equipment.state.date) }}
        </p>
        <p
          v-if="equipment.model"
          data-testid="marker-tooltip-equipment-model-name"
        >
          Modelo: {{ equipment.model.name }}
        </p>
        <p
          v-if="hourlyEarning"
          data-testid="marker-tooltip-equipment-model-hourly"
        >
          Custo hora: {{ formatCurrency(hourlyEarning.value) }}
        </p>
        <p data-testid="marker-tooltip-position">
          Posição atualizada em: {{ formatDateTime(equipment.position.date) }}
        </p>
      </div>
    </LTooltip>
  </LMarker>
</template>

<style>
.equipment-marker__icon.leaflet-div-icon {
  @apply bg-none border-none;
}
</style>