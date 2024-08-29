<template>
<div class="map row">
  <header class="map__header col-12">
    <div class="map__header__title">
      <q-icon name="help" color="primary" />
      <span>Painel de Posições</span>
      <q-icon name="help" color="primary" />
    </div>
    <div class="map__header__filters">
      <span>filtros:</span>
      <c-date-picker @update:selectedValue="updateValueDate" />
      <c-model-equipment @update:selectedValue="updateValueEquipmentModel" />
      <c-state-equipment @update:selectedValue="updateValueEquipmentState" />
      <q-btn class="map__header__filters--btn" dense color="primary" icon="search" label="pesquisar" @click="setFilter" />
    </div>
  </header>
  <div class="map__details col-md-4 col-xs-12">
    <q-list bordered>
      <div class="map__details__header">
        <span>Equipamento:</span>
        <span>Status:</span>
      </div>

      <q-item
        clickable
        v-ripple
        class="q-pa-md"
        v-for="item in listEquipments"
        style="border-top: 1px solid #ccc;"
        :active="equipmentSelected === item.equipment"
        @click="showPositionEquipment(item.equipment)"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ item.modelName.substring(0, 2).toLocaleUpperCase() }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <span>{{ item.equipment.name }}</span>
          <q-item-label caption lines="1">{{ item.modelName }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="map__details--status" :style="{ backgroundColor: item.currentState?.color }">
            <span>{{ item.currentState?.name }}</span>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div class="map__local col-md-8 col-xs-12">
    <MapComponent v-if="positionEquipment" :Markers="positionEquipment" />
  </div>
</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { MapComponent } from '../components';
import { EquipmentState, EquipmentModel, Equipment } from '../interfaces/models.interface';
import { useEquipmentsStore } from '../stores/equipment.store';

defineOptions({
  name: 'Map'
});

const dateSelected = ref<string | null>(null);
const equipmentStateSelected = ref<string | null>(null);
const equipmentModelSelected = ref<string | null>(null);

function updateValueEquipmentState(value: EquipmentState) {
  return equipmentStateSelected.value = value.id;
};
function updateValueEquipmentModel(value: EquipmentModel) {
  return equipmentModelSelected.value = value.id;
};
function updateValueDate(value: string) {
  return dateSelected.value = value;
};
function filterHeader() {
  return {
    date: dateSelected.value || null,
    equipmentModelId: equipmentModelSelected.value || null,
    equipmentStateId: equipmentStateSelected.value || null
  }
}


// Abaixo os tratamentos da Store
const $useEquipmentsStore = useEquipmentsStore();

const listEquipments = computed(() => $useEquipmentsStore.listEquipments);
const equipmentSelected = computed(() => $useEquipmentsStore.equipmentSelected);
const positionEquipment = computed(() => $useEquipmentsStore.positionEquipment);

async function showPositionEquipment(value) {
  $useEquipmentsStore.setNull();

  await $useEquipmentsStore.setEquipment(value);
}

async function setFilter() {
  return $useEquipmentsStore.setFilters(filterHeader());
}

onMounted(async () => {
  await $useEquipmentsStore.getEquipments();
});
</script>

<style lang="scss" scoped>
.map {
  height: 100%;

  &__header {
    display: flex;
    flex-direction: column;
    height: 120px;
    width: 100%;
    font-size: 1.1rem;
    margin-bottom: 20px;
    margin-top: 20px;

    &__title {
      display: flex;
      height: 50%;
      align-items: center;
      margin-bottom: 20px;
      margin-left: 20px;
      gap: 10px;
    }

    &__filters {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      height: 50%;
      gap: 10px;
      color: $primary;

      &--btn {
        font-size: 11px;
        padding: 8px;
        border-radius: 10px;
      }
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    max-height: 550px;
    overflow: scroll;

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px 20px 10px 20px;
    }

    &--status {
      width: auto;
      padding: 5px;
      text-align: center;
      border-radius: 10px;
      color: #fff;
    }
  }

  &__local {
    position: relative;
  }
}

.q-item.q-router-link--active, .q-item--active {
  background-color: #c0ebf7;
}
</style>
