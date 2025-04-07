<template>
  <div class="report-view container py-4">
    <h1 class="mb-4 text-center">📊 {{ $t("reportView.title") }}</h1>

    <div class="mb-4">
      <label for="reportSelect" class="form-label fw-bold">
        {{ $t("reportView.selectReportType") }}
      </label>
      <select id="reportSelect" v-model="selectedReport" class="form-select">
        <option value="summary">📘 {{ $t("reportView.summary") }}</option>
        <option value="history">📚 {{ $t("reportView.history") }}</option>
        <option value="location">📍 {{ $t("reportView.location") }}</option>
        <option value="duration">⏳ {{ $t("reportView.duration") }}</option>
        <option value="profit">💰 {{ $t("reportView.profit") }}</option>
      </select>
    </div>

    <div v-if="selectedReport === 'summary'">
      <Reports />
    </div>
    <div v-if="selectedReport === 'history'">
      <ReportEquipment />
    </div>
    <div v-if="selectedReport === 'location'">
      <ReportLocale />
    </div>
    <div v-if="selectedReport === 'duration'">
      <ReportStateDuration />
    </div>
    <div v-if="selectedReport === 'profit'">
      <ReportProfit />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Reports from "@/views/Report/Components/Reports.vue";
import ReportEquipment from "@/views/Report/Components/ReportEquipment.vue";
import ReportLocale from "@/views/Report/Components/ReportLocale.vue";
import ReportStateDuration from "@/views/Report/Components/ReportStateDuration.vue";
import ReportProfit from "@/views/Report/Components/ReportProfit.vue";

const selectedReport = ref("summary");
</script>

<style scoped>
.report-view {
  max-width: 900px;
  margin: auto;
}

h1 {
  color: #333;
}

.form-select {
  max-width: 400px;
}
</style>
