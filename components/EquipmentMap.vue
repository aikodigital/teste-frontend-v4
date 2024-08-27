<script lang="ts" setup>
/** Data */
import {
  equipmentData,
  equipmentModelData,
  equipmentPositionHistoryData,
  equipmentStateData,
  equipmentStateHistoryData
} from '~/data/equipment';

/** Interfaces */
import type {
  IEquipment,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory
} from '~/interfaces/equipment';

const equipments = ref<IEquipment[]>(equipmentData);
const equipmentsModel = ref<IEquipmentModel[]>(equipmentModelData);
const equipmentsPositionHistory = ref<IEquipmentPositionHistory[]>(equipmentPositionHistoryData);
const equipmentsStateHistory = ref<IEquipmentStateHistory[]>(equipmentStateHistoryData);
const equipmentState = ref<IEquipmentState[]>(equipmentStateData);

const recentEquipments = ref(getEquipmentDetails(
  equipments.value,
  equipmentsModel.value,
  equipmentsPositionHistory.value,
  equipmentsStateHistory.value,
  equipmentState.value
));

const zoom = ref(2);
</script>

<template>
  <div>
    <LMap style="height: 700px" :zoom="zoom" :center="[47.21322, -1.559482]" :use-global-leaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base" name="OpenStreetMap" />

      <div v-for="equipment in recentEquipments" :key="equipment.id">
        <LMarker :lat-lng="[equipment.currentPosition.lat, equipment.currentPosition.lon]">
          <LPopup>
            <div class="flex flex-col">
              <span>
                Nome: {{ equipment.name }}
              </span>

              <span>
                Modelo: {{ equipment.model?.name }}
              </span>

              <span>
                Estado Atual:
                <span :class="getCurrentStateClass(equipment.currentState!)">
                  {{ equipment.currentState?.name }}
                </span>
              </span>
            </div>
          </LPopup>
        </LMarker>
      </div>
    </LMap>
  </div>
</template>
