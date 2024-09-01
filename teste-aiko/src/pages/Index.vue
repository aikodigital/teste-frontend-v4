<script setup lang="ts">
import Map from "@/components/Map.vue";
import { useLoader } from "@/composables/index";
import { useEquipmentStore } from '@/stores/EquipmentStore';
import EquipmentMarker from "@/components/EquipmentMarker.vue";
import EquipmentSidebar from "@/components/EquipmentSidebar/EquipmentSidebar.vue";
import { computed, reactive, ref } from "vue";
import { Equipment, EquipmentJson } from "@/types/Equipment";
import { useEquipmentStateStore } from '@/stores/EquipmentStateStore';
import { useEquipmentModelStore } from '@/stores/EquipmentModelStore';
import Filters from "@/components/Filters.vue";
import Skeleton from "@/components/Skeleton.vue";
import { RequiredFields } from "@/types/Utils";

const equipmentStore = useEquipmentStore();
const equipmentModelStore = useEquipmentModelStore();
const equipmentStateStore = useEquipmentStateStore();

const [isFetchingEquipments, fetchEquipments] = useLoader(equipmentStore.fetchEquipments);
fetchEquipments();

const [isFetchingFilters, fetchFilters] = useLoader(async () => {
  await Promise.all([
    equipmentStateStore.fetchEquipmentStates(),
    equipmentModelStore.fetchEquipmentModels()
  ]);
});

fetchFilters();

const selectedEquipment = ref<EquipmentJson | null>(null);

const filters = reactive({
  equipmentStateId: null as string | null,
  equipmentModelId: null as string | null,
});

const filteredEquipments = computed(() => {
  if (equipmentStore.equipments.length === 0) {
    return [];
  }

  return equipmentStore.equipments.filter((equipment) => {
    let flag = true;

    if (filters.equipmentStateId) {
      flag = equipment.state?.id === filters.equipmentStateId && flag;
    }

    if (filters.equipmentModelId) {
      flag = equipment.model?.id === filters.equipmentModelId && flag;
    }

    if (!equipment.position) {
      flag = false;
    }

    return flag;
  }) as Array<RequiredFields<Equipment, "position">>;
});


</script>

<template>
  <div class="p-3 rounded w-screen h-screen flex flex-col gap-6">
    <div class="flex gap-2 items-center max-md:flex-col">
      <div>
        <h2 class="text-xl">
          Filtros <i class="fa-solid fa-filter"></i>
        </h2>
      </div>

      <hr class="w-[1px] h-full bg-gray-400">

      <Skeleton :is-loading="isFetchingFilters">
        <Filters
          v-model:equipment-model-id="filters.equipmentModelId"
          v-model:equipment-state-id="filters.equipmentStateId"
        />
        <template #skeleton>
          <div class="flex gap-2">
            <div
              v-for="i in 2"
              :key="`skeleton-${i}`"
              class="animate-pulse min-w-[60px] h-[30px] bg-gray-300 rounded-md cursor-wait"
            ></div>
          </div>
        </template>
      </Skeleton>
    </div>
    <div class="rounded-xl h-full w-full relative overflow-hidden">
      <Map>
        <EquipmentMarker
          v-for="equipment in filteredEquipments"
          :key="equipment.id"
          :equipment="equipment"
          @click="() => selectedEquipment = equipment"
        />
      </Map>
      <div
        v-if="isFetchingEquipments"
        class="h-full w-full absolute animate-pulse bg-gray-300 top-0 left-0 z-[1000] grid place-items-center"
      >
        <i class="fa-solid fa-spinner animate-spin fa-3x text-blue-600"></i>
      </div>
    </div>
    <Transition>
      <EquipmentSidebar
        v-if="selectedEquipment"
        @close="() => selectedEquipment = null"
        :equipment="selectedEquipment"
      />
    </Transition>
  </div>
</template>
