<script lang="ts" setup>
/** Interfaces */
import type { IEquipmentDetails } from '~/interfaces/equipment';

const props = withDefaults(defineProps<{
  equipment: IEquipmentDetails;
  hideAction?: boolean;
}>(), {
  hideAction: false,
});

const iconName = 'fa6-solid:clock-rotate-left';
const { setView } = useView();
const { setSelectedEquipment } = useSelectedEquipment();

function handleShowStateHistory() {
  setView('stateHistory');
  setSelectedEquipment(props.equipment);
}
</script>

<template>
  <div class="flex flex-col">
    <span>
      <span class="font-bold">
        Nome:
      </span>

      {{ equipment.name }}
    </span>

    <span>
      <span class="font-bold">
        Modelo:
      </span>

      {{ equipment.model?.name }}
    </span>

    <span>
      <span class="font-bold">
        Estado atual:
      </span>

      <span :class="getCurrentStateClass(equipment.currentState!)">
        {{ equipment.currentState }}
      </span>
    </span>

    <button v-if="!hideAction" class="border rounded-md flex items-center gap-1 px-2 w-fit"
      @click="handleShowStateHistory">
      <Icon :name="iconName" />

      Histórico de estados
    </button>
  </div>
</template>