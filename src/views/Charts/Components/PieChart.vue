<template>
  <div class="chart-wrapper">
    <template v-if="!chartData">{{ t("chart.loading") }}</template>
    <template v-else-if="!chartData.datasets?.length">
      <p>{{ t("chart.noDataAvailable") }}</p>
    </template>
    <Pie v-else :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Pie } from "vue-chartjs";
import { useEquipmentDataStore } from "@/store/equipmentDataStore";
import { useI18n } from "vue-i18n";

const store = useEquipmentDataStore();

const chartData = ref();

const { t } = useI18n();

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        color: "#333",
        font: { size: 14 },
      },
    },
    title: {
      display: true,
      text: t("chart.DistributionofGainbyEquipment"),
      color: "#111",
      font: { size: 18 },
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: import("chart.js").TooltipItem<"pie">) {
          const label = tooltipItem.label || "";
          const raw = tooltipItem.raw as number;
          return `${label}: ${t("chart.$")} ${raw.toFixed(2)}`;
        },
      },
    },
  },
};

function generatePieChartData() {
  const labels: string[] = [];
  const gainData: number[] = [];

  for (const equipment of store.equipment) {
    const model = store.equipmentModels.find(
      (m) => m.id === equipment.equipmentModelId
    );
    const history = store.stateHistory.find(
      (h) => h.equipmentId === equipment.id
    );

    if (!model || !history) continue;

    let totalGain = 0;

    for (const entry of history.states) {
      const state = store.states.find((s) => s.id === entry.equipmentStateId);
      if (!state) continue;

      const earning = model.hourlyEarnings.find(
        (e) => e.equipmentStateId === state.id
      );
      if (earning) {
        totalGain += earning.value;
      }
    }

    labels.push(equipment.name);
    gainData.push(totalGain);
  }

  const backgroundColors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#22D3EE",
    "#14B8A6",
    "#F97316",
  ];

  return {
    labels,
    datasets: [
      {
        label: t("chart.totalGains") + " " + t("chart.$"),
        data: gainData,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderWidth: 1,
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

  chartData.value = generatePieChartData();
});
</script>

<style scoped lang="scss">
.chart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-height: calc(100vh - 150px);
  margin: 0;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
</style>
