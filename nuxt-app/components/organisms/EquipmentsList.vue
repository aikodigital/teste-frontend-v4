<template>
  <div class="main-content-equipment-list">
    <div>
      <div>
        <div class="title-switch">
          <h3>PESQUISA</h3>
          <v-switch
            v-model="switchTrajectory"
            color="primary"
            label="Exibir linhas trajetórias"
            density="compact"
            class="custom-switch"
          />
        </div>

        <div class="filters-content">
          <Autocomplete
            :equipments="equipments"
            :label="'Selecione os equipamentos que deseja filtrar'"
          />

          <Select />
        </div>
      </div>
      <div class="equipments-listing">
        <h3>EQUIPAMENTOS ATIVOS NO MAPA</h3>
        <HighlightEquipments />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IEquipmentNormalized } from '~/interfaces/equipments.interface';

const props = defineProps<{
  equipments: IEquipmentNormalized[];
}>();

const { equipments } = props;
const { emit } = useEventBus();
const switchTrajectory = ref(false);

watch(switchTrajectory, (newValue) => {
  emit('switchTrajectory', newValue);
});
</script>

<style>
.main-content-equipment-list {
  height: 100%;
  align-content: center;

  h3 {
    margin-bottom: 10px;
  }

  .equipments-listing {
    min-height: 600px;
  }
}

.filters-content {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 768px) {
  .filters-content {
    grid-template-columns: 100%;
  }
}

.custom-switch {
  transform: scale(0.8);
  padding-top: 10px;
}

.title-switch {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
