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
      <q-btn class="map__header__filters--btn" dense color="primary" icon="search" label="pesquisar" @click="showData" />
    </div>
  </header>
  <div class="map__details col-4">
    <q-list bordered>
      <div class="map__details__header">
        <span>Equipamento:</span>
        <span>Status:</span>
      </div>

      <q-item v-for="item in getEquipmentsWithModelAndState()" class="q-pa-md" clickable v-ripple style="border-top: 1px solid #ccc;">
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
  <div class="col-8">
    <MapComponent :Markers="positionsHistory?.positions" />
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MapComponent } from '../components';
import {
  EquipmentState,
  EquipmentModel
} from '../interfaces/models.interface';
import {
  getEquipmentsWithModelAndState,
  getEquipmentPositionHistory,
  getEquipmentStateHistory,
  getEquipmentsByState,
  getModelsByStateEarnings,
  calculateModelEarnings
} from '../services/calcs';

defineOptions({
  name: 'Map'
});

const dateSelected = ref<string | null>(null);
const equipmentStateSelected = ref<string | null>(null);
const equipmentModelSelected = ref<string | null>(null);
const positionsHistory = ref(getEquipmentPositionHistory('1c7e9615-cc1c-4d72-8496-190fe5791c8b'));

function updateValueEquipmentState(value: EquipmentState) {
  return equipmentStateSelected.value = value.id;
};
function updateValueEquipmentModel(value: EquipmentModel) {
  return equipmentModelSelected.value = value.id;
};
function updateValueDate(value: string) {
  return dateSelected.value = value;
};
function setRequision() {
  return {
    date: dateSelected.value || null,
    stateEquipment: equipmentStateSelected.value || null,
    modelEquipment: equipmentModelSelected.value || null
  }
}
function showData() {
  console.log(setRequision());
}
</script>

<style lang="scss" scoped>
.map {
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
}
</style>
