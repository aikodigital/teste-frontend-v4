<script lang="ts" setup>
/** Core */
import type { PointExpression } from 'leaflet';

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
  IEquipmentDetails,
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

const recentEquipments = ref<IEquipmentDetails[]>(getEquipmentDetails(
  equipments.value,
  equipmentsModel.value,
  equipmentsPositionHistory.value,
  equipmentsStateHistory.value,
  equipmentState.value
));

const equipmentsRecentPositions = getEquipmentsRecentPosition(recentEquipments.value);
const centralPosition = ref<PointExpression>(getCentralPosition(equipmentsRecentPositions));
const zoom = ref<number>(getZoomLevel(equipmentsRecentPositions));
</script>

<template>
  <div>
    <LMap ref="map" style="height: 700px" :zoom="zoom" :center="centralPosition" :useGlobalLeaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layerType="base" name="OpenStreetMap" />

      <div v-for="equipment in recentEquipments" :key="equipment.id">
        <EquipmentMarker v-for="equipment in recentEquipments" :key="equipment.id" :equipment="equipment" />
      </div>
    </LMap>
  </div>
</template>
