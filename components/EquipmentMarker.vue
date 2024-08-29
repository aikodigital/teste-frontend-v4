<script lang="ts" setup>
/** Interfaces */
import type { IEquipmentDetails } from '~/interfaces/equipment';

/** Propriedades do componente
 * @property {IEquipmentDetails} equipment - Dados do equipamento
 */
const props = defineProps<{
  equipment: IEquipmentDetails;
}>();
</script>

<template>
  <LMarker :latLng="[equipment.currentPosition.lat, equipment.currentPosition.lon]">
    <LPopup>
      <EquipmentDetails :equipment="equipment" />
    </LPopup>

    <LIcon :icon-size="[32, 32]">
      <Icon :name="getIconModel(equipment.model?.name)" class="size-8" />
    </LIcon>
  </LMarker>
</template>
