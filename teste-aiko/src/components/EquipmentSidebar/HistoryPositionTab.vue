<script setup lang="ts">
import { computed, ref } from 'vue';
import Tab from '../Tab.vue';
import { EquipmentPositionHistoryJson, Position } from '@/types/EquipmentPositionHistory';
import { Equipment } from '@/types/Equipment';
import { useLoader } from '@/composables';
import { getEquipmentHistoryPosition } from '@/services/EquipmentPositionService';
import Map from '../Map.vue';
import { LIcon, LMarker, LPolyline, LTooltip } from '@vue-leaflet/vue-leaflet';
import dayjs from 'dayjs';
import { formatDateTime } from '@/utils';

const props = defineProps<{ equipment: Equipment }>();

const historyPosition = ref<EquipmentPositionHistoryJson>();

const [isFetcingHistoryPosition, fetchHistoryPosition] = useLoader(async () => {
  const data = await getEquipmentHistoryPosition(props.equipment);

  if (!data) {
    return;
  }

  historyPosition.value = data;
});

fetchHistoryPosition();

const lastMapPosition = computed(() => {
  return [props.equipment.position?.lat, props.equipment.position?.lon];
});

const latLangs = computed<Array<[number, number]>>(() => {
  if (!ordenerdHistoryStates.value) {
    return [];
  }

  return ordenerdHistoryStates.value.map((position: Position) => [position.lat, position.lon]);
});

const ordenerdHistoryStates = computed(() => {
  if (!historyPosition.value) {
    return [];
  }

  return [...historyPosition.value.positions].sort((a, b) => {
    if (dayjs(a.date).isBefore(dayjs(b.date))) {
      return -1;
    }

    return 1;
  });
});

</script>

<template>
  <Tab title="Histórico de Posições">
    <div class="p-2 rounded w-full h-full relative overflow-hidden">
      <Map
        class="rounded-xl"
        :center="lastMapPosition"
        :zoom="15"
      >
        <template v-if="historyPosition">
          <LMarker
            role="position-marker"
            v-for="(position, idx) in ordenerdHistoryStates"
            :lat-lng="[position.lat, position.lon]"
            :key="`${position.lat}-${position.lon}-${idx}`"
          >
            <LIcon
              class-name="position-marker__icon"
              :icon-size="[20, 20]"
              :icon-anchor="[10, 10]"
            >
              <div class="rounded-full p-1 bg-blue-300 h-7 w-7">
                <p
                  class="font-semibold text-center"
                  data-testid="position-marker-icon"
                >
                  {{ idx + 1 }}
                </p>
              </div>
            </LIcon>
            <LTooltip>
              <div class="flex flex-col gap-2">
                <p data-testid="position-marker-tooltip-date">
                  Atualizado em: {{ formatDateTime(position.date) }}
                </p>
              </div>
            </LTooltip>
          </LMarker>
          <LPolyline :lat-lngs="latLangs" />
        </template>
      </Map>
      <div
        v-if="isFetcingHistoryPosition"
        data-testid="history-position-loader"
        class="h-full w-full absolute animate-pulse bg-gray-300 top-0 left-0 z-[1000] grid place-items-center"
      >
        <i class="fa-solid fa-spinner animate-spin fa-2x text-blue-600"></i>
      </div>
    </div>
  </Tab>
</template>