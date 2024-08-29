<script lang="ts" setup>
/** Interfaces */
import { SwitchRoot, SwitchThumb } from 'radix-vue';
import type { IEquipmentDetails } from '~/interfaces/equipment';

const props = withDefaults(defineProps<{
  equipment: IEquipmentDetails;
  hideAction?: boolean;
}>(), {
  hideAction: false,
});

const { setView } = useView();
const { toggleRoute, hasRoute } = useShowRoutes();
const { setSelectedEquipment } = useSelectedEquipment();

const isChecked = computed(() => hasRoute(props.equipment.id));

const iconRotateLeft = 'fa6-solid:clock-rotate-left';
const iconPercent = 'fa6-solid:percent';

function handleShowStateHistory() {
  setView('stateHistory');
  setSelectedEquipment(props.equipment);
}

function handleShowPercentage() {
  setView('percentage');
  setSelectedEquipment(props.equipment);
}

function handleSwitchRoute() {
  toggleRoute(props.equipment);
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

      <Icon :name="getIconModel(equipment.model?.name)" />

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

    <div class="flex flex-col gap-1">
      <button v-if="!hideAction" class="border rounded-md flex items-center gap-1 px-2 w-fit"
        @click="handleShowStateHistory">
        <Icon :name="iconRotateLeft" />

        Histórico de estados
      </button>

      <button v-if="!hideAction" class="border rounded-md flex items-center gap-1 px-2 w-fit"
        @click="handleShowPercentage">
        <Icon :name="iconPercent" />

        Produtividade diária
      </button>

      <div class="flex gap-1 items-center">
        <SwitchRoot id="showRoute" v-model:checked="isChecked" @update:checked="handleSwitchRoute"
          class="w-12 h-6 focus-within:outline focus-within:outline-black focus-within:outline-2 flex bg-slate-500 rounded-full relative data-[state=checked]:bg-blue-500 cursor-pointer">
          <SwitchThumb
            class="block size-5 my-auto bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[25px]" />
        </SwitchRoot>

        <label for="showRoute">
          Exibir trajeto
        </label>
      </div>
    </div>
  </div>
</template>