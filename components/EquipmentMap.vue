<script lang="ts" setup>
/** Data */
import equipmentData from '~/data/equipment.json';
import equipmentModelData from '~/data/equipmentModel.json';
import equipmentPositionHistoryData from '~/data/equipmentPositionHistory.json';
import equipmentStateData from '~/data/equipmentState.json';
import equipmentStateHistoryData from '~/data/equipmentStateHistory.json';

/** Interfaces */
import type { IEquipment } from '~/interfaces/IEquipment';
import type { IEquipmentModel } from '~/interfaces/IEquipmentModel';
import type { IEquipmentPositionHistory } from '~/interfaces/IEquipmentPositionHistory';
import type { IEquipmentState } from '~/interfaces/IEquipmentState';
import type { IEquipmentStateHistory } from '~/interfaces/IEquipmentStateHistory';

const equipments = ref<IEquipment[]>(equipmentData);
const equipmentsModel = ref<IEquipmentModel[]>(equipmentModelData);
const equipmentsPositionHistory = ref<IEquipmentPositionHistory[]>(equipmentPositionHistoryData);
const equipmentsStateHistory = ref<IEquipmentStateHistory[]>(equipmentStateHistoryData);
const equipmentState = ref<IEquipmentState[]>(equipmentStateData);

const recentEquipments = ref(getEquipmentDetails());
const zoom = ref(2);

function getEquipmentDetails() {
  return equipments.value.map((equipment) => {
    const model = equipmentsModel.value.find((model) => model.id === equipment.equipmentModelId);
    const positionHistory = equipmentsPositionHistory.value.find((positionHistory) => positionHistory.equipmentId === equipment.id)?.positions || [];
    const stateHistory = equipmentsStateHistory.value.find((stateHistory) => stateHistory.equipmentId === equipment.id)?.states || [];
    const currentPosition = getLastPosition(positionHistory);
    const currentState = getLastState(stateHistory);

    return {
      id: equipment.id,
      name: equipment.name,
      model,
      currentState,
      stateHistory,
      currentPosition,
      positionHistory,
    };
  });
}

function getLastPosition(positions: { lat: number; lon: number }[]) {
  return positions[positions.length - 1];
}

function getLastState(states: { date: string; equipmentStateId: string }[]) {
  const lastState = states[states.length - 1];
  return equipmentState.value.find((state) => state.id === lastState.equipmentStateId);
}

function getCurrentStateClass(state: IEquipmentState) {
  return state.name === 'Operando' ? 'text-operando'
    : state.name === 'Parado' ? 'text-parado'
      : 'text-manutencao';
}
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
