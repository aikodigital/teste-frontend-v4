<template>
  <div class="state-equipment">
    <q-select
      dense
      rounded
      outlined
      v-model="stateEquipmentSelected"
      option-label="name"
      :options="optionsStateEquipment"
      label="Estado do equipamento"
      @update:model-value="emitValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EquipmentState } from 'src/interfaces/models.interface';
import StateEquipmentJson from '../../../data/equipmentState.json';

const stateEquipmentSelected = ref<EquipmentState>();
const optionsStateEquipment: Array<EquipmentState> = StateEquipmentJson;

const emit = defineEmits<{
  (event: 'update:selectedValue', value: EquipmentState | undefined): void;
}>();

const emitValue = (value: EquipmentState | undefined) => {
  emit('update:selectedValue', value);
};

defineOptions({
  name: 'StateEquipments'
});
</script>

<style lang="scss" scoped>
.state-equipment {
  width: 250px;
}
</style>
