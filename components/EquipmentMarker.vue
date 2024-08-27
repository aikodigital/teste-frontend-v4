<script lang="ts" setup>
/** Interfaces */
import type { IEquipmentDetails } from '~/interfaces/equipment';

const props = defineProps<{
  equipment: IEquipmentDetails;
}>();
</script>

<template>
  <LMarker :latLng="[equipment.currentPosition.lat, equipment.currentPosition.lon]">
    <LPopup>
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
            Estado Atual:
          </span>

          <span :class="getCurrentStateClass(equipment.currentState!)">
            {{ equipment.currentState?.name }}
          </span>
        </span>
      </div>
    </LPopup>
  </LMarker>
</template>
