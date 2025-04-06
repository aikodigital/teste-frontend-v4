<template>
  <div class="chart-wrapper">
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Bar } from "vue-chartjs";
import { useEquipmentDataStore } from "@/store/equipmentDataStore";
import type { EquipmentState } from "@/types/types";

const store = useEquipmentDataStore();

const { t } = useI18n();

const chartData = ref();

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#333",
        font: { size: 14 },
      },
    },
    title: {
      display: true,
      text: t("chart.ProductivityandGainperEquipment"),
      color: "#111",
      font: { size: 18 },
    },
  },
  scales: {
    x: {
      ticks: { color: "#666" },
    },
    y: {
      type: "linear" as const,
      position: "left" as const,
      ticks: {
        color: "#666",
      },
      title: {
        display: true,
        text: t("chart.totalGains") + " " + t("chart.$"),
      },
    },
    y1: {
      type: "linear" as const,
      position: "right" as const,
      ticks: {
        color: "#3B82F6",
        callback: function (value: unknown) {
          return value + "%";
        },
      },
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: t("chart.productivity") + " %",
      },
    },
  },
};

function isProductiveState(state: EquipmentState) {
  return state.name.toLowerCase() === "operando";
}

function generateChartData() {
  const labels: string[] = [];
  const productivityData: number[] = [];
  const gainData: number[] = [];

  for (const equipment of store.equipment) {
    const model = store.equipmentModels.find(
      (m) => m.id === equipment.equipmentModelId
    );
    const history = store.stateHistory.find(
      (h) => h.equipmentId === equipment.id
    );

    if (!model || !history) continue;

    let totalStates = 0;
    let productiveStates = 0;
    let totalGain = 0;

    for (const stateEntry of history.states) {
      const state = store.states.find(
        (s) => s.id === stateEntry.equipmentStateId
      );
      if (!state) continue;

      totalStates++;

      const isProductive = isProductiveState(state);
      if (isProductive) productiveStates++;

      const earning = model.hourlyEarnings.find(
        (e) => e.equipmentStateId === state.id
      );
      if (earning) {
        totalGain += earning.value;
      }
    }

    const productivity =
      totalStates > 0 ? (productiveStates / totalStates) * 100 : 0;

    labels.push(equipment.name);
    productivityData.push(Number(productivity.toFixed(2)));
    gainData.push(Number(totalGain.toFixed(2)));
  }

  return {
    labels,
    datasets: [
      {
        label: t("chart.totalGains") + " " + t("chart.$"),
        backgroundColor: "#10B981",
        data: gainData,
        yAxisID: "y",
      },
      {
        label: t("chart.productivity"),
        data: productivityData,
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        type: "line",
        yAxisID: "y1",
        tension: 0.4,
        fill: false,
      },
    ],
  };
}

onMounted(async () => {
  await Promise.all([
    store.fetchEquipment(),
    store.fetchEquipmentModels(),
    store.fetchStates(),
    store.fetchStateHistory(),
  ]);

  chartData.value = generateChartData();
});
</script>

<style scoped lang="scss">
.chart-wrapper {
  height: 100vh;
  width: 100%;
  max-height: calc(100vh - 150px);
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
</style>
