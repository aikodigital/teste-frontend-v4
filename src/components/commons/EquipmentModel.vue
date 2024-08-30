<template>
  <div class="equipment-model">
    <q-select
      rounded
      outlined
      dense
      v-model="equipmentModelSelected"
      option-label="name"
      :options="optionsEquipmentModel"
      label="Modelo do equipamento"
      @update:model-value="emitValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import EquipmentModelJson from '../../../data/equipmentModel.json';

interface EquipmentModel {
  id: string,
  name: string
}

const equipmentModelSelected = ref<EquipmentModel>();
const optionsEquipmentModel: Array<EquipmentModel> = EquipmentModelJson;

const emit = defineEmits<{
  (event: 'update:selectedValue', value: EquipmentModel | undefined): void;
}>();

const emitValue = (value: EquipmentModel | undefined) => {
  emit('update:selectedValue', value);
};

defineOptions({
  name: 'EquipmentsModel'
});
</script>

<style lang="scss" scoped>
.equipment-model {
  width: 250px;
}
</style>
