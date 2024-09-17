<template>
  <div class="p-8 bg-gray-950 w-full h-auto flex">
    <EquipmentList :equipments="equipments" :selectedEquipment="selectedEquipment"
      :handleEquipmentClick="handleEquipmentClick" :states="states" :models="models" />
    <div v-if="selectedEquipment" class="w-full">
      <EquipmentDetails :selectedEquipment="selectedEquipment" />
      <EquipmentMap v-if="selectedEquipment" :key="selectedEquipment.id" ref="equipmentMap"
        :initialPosition="mapPosition" :selectedEquipment="selectedEquipment"
        :positionHistory="selectedEquipment.positionHistory" :view-path="viewPath" />
      <button @click="toggleViewPath" class="btn mt-4 text-white bg-orange-500">
        {{ viewPath ? 'Esconder' : 'Ver' }} o trajeto do equipamento
      </button>
      <EquipmentStateHistory :stateHistory="selectedEquipment.stateHistory" :chartData="chartData" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import EquipmentList from '../components/EquipmentList.vue';
import EquipmentDetails from '../components/EquipmentDetails.vue';
import EquipmentStateHistory from '../components/EquipmentStateHistory.vue';
import { getEquipmentPosition } from '../utils/getPosition.ts';
import { Equipment, useEquipmentStore } from '../stores/equipmentStore.ts';
import EquipmentMap from '../components/EquipmentMap.vue';

interface EquipmentMapInstance {
  drawPath: (positions: { lat: number; lon: number }[]) => void;
  updatePosition: (position: { lat: number; lon: number }) => void;
  updateMarker: (position: { lat: number; lon: number }) => void;
}

interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

export default {
  components: {
    EquipmentList,
    EquipmentDetails,
    EquipmentStateHistory,
    EquipmentMap,
  },
  setup() {
    const store = useEquipmentStore();
    const equipments = ref(store.equipments.map((equipment) => ({
      ...equipment,
      position: getEquipmentPosition(equipment.id) || { lat: 0, lon: 0 },
      states:
        store.getStateHistory(equipment.id)?.states.map(({ equipmentStateId }) =>
          store.states.find((state) => state.id === equipmentStateId) || { id: '', name: 'Desconhecido', color: '#000000' }
        ) || [],
      model: store.getModel(equipment.equipmentModelId),
    })));

    const states = store.states;
    const models = store.models;
    const selectedEquipment = ref<Equipment | null>(null);
    const viewPath = ref(false);

    const chartData = ref<ChartData>({
      labels: [],
      datasets: [{ label: 'Histórico de Estados', data: [0] }],
    });

    const mapPosition = ref({ lat: 0, lon: 0 });
    const equipmentMapRef = ref<EquipmentMapInstance | null>(null);

    const handleEquipmentClick = (equipment: Equipment) => {
      const stateHistory =
        store.getStateHistory(equipment.id)?.states.map(({ date, equipmentStateId }) => {
          const state = store.states.find((state) => state.id === equipmentStateId);
          return { date, name: state ? state.name : 'Desconhecido' };
        }) || [];

      const positionHistory =
        store.getPositionHistory(equipment.id)?.positions.map(({ date, lat, lon }) => ({
          date,
          lat,
          lon,
        })) || [];

      viewPath.value = false;
      selectedEquipment.value = { ...equipment, stateHistory, positionHistory, state: states[states.length - 1], model: store.getModel(equipment.equipmentModelId) };
      updateChartData();

      mapPosition.value = getEquipmentPosition(equipment.id) || { lat: 0, lon: 0 };
      if (equipmentMapRef.value) {
        equipmentMapRef.value.updatePosition(mapPosition.value);
        equipmentMapRef.value.updateMarker(mapPosition.value);
      }
    };

    const toggleViewPath = () => {
      viewPath.value = !viewPath.value;
      if (viewPath.value && selectedEquipment.value) {
        drawEquipmentPath();
      }
    };

    const updateChartData = () => {
      if (selectedEquipment.value) {
        const history = selectedEquipment.value.stateHistory;
        const stateCounts: { [key: string]: number } = {};
        history.forEach((item) => {
          stateCounts[item.name] = (stateCounts[item.name] || 0) + 1;
        });

        chartData.value = {
          labels: Object.keys(stateCounts),
          datasets: [{ label: 'Histórico de Estados', data: Object.values(stateCounts) }],
        };
      }
    };

    const drawEquipmentPath = () => {
      if (selectedEquipment.value && selectedEquipment.value.positionHistory && equipmentMapRef.value) {
        const positions = selectedEquipment.value.positionHistory.map((pos) => ({
          lat: pos.lat,
          lon: pos.lon,
        }));
        equipmentMapRef.value.drawPath(positions);
      }
    };

    onMounted(() => {
      if (equipments.value.length > 0) {
        handleEquipmentClick(equipments.value[0]);
      }
    });

    return {
      equipments,
      selectedEquipment,
      handleEquipmentClick,
      chartData,
      states,
      models,
      mapPosition,
      equipmentMapRef,
      toggleViewPath,
      viewPath,
    };
  },
};
</script>
