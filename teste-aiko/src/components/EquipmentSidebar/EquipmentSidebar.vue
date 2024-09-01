<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Equipment } from "@/types/Equipment";
import { computed } from "vue";
import { formatCurrency } from "@/utils/index";
import TabController from "@/components/TabController.vue";
import HistoryStateTab from "./HistoryStateTab.vue";
import HistoryPositionTab from "./HistoryPositionTab.vue";

const props = defineProps<{ equipment: Equipment }>();

const hourlyEarning = computed(() => {
  if (!props.equipment.model) {
    return null;
  }

  return props.equipment.model.hourlyEarnings.find((earning) => props.equipment.state?.id === earning.equipmentStateId);
});


</script>

<template>
  <Sidebar>
    <p
      class="font-bold text-xl"
      data-testid="sidebar-equipment-name"
    >
      Equipamento: {{ equipment.name }}
    </p>
    <p v-if="equipment.state">
      Estado atual:
      <span
        class="py-1 px-2 w-fit rounded font-bold ml-2 text-gray-900"
        :style="{ backgroundColor: equipment.state.color }"
      >
        {{ equipment.state.name }}
      </span>
    </p>
    <p
      v-if="hourlyEarning"
      data-testid="sidebar-equipment-hourly-earning"
    >
      Custo hora: {{ formatCurrency(hourlyEarning.value) }}
    </p>
    <div class="flex-1">
      <TabController class="h-full">
        <HistoryStateTab :equipment="equipment" />
        <HistoryPositionTab :equipment="equipment" />
      </TabController>
    </div>
  </Sidebar>
</template>