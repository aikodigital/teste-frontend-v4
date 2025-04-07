<template>
  <div class="container py-4">
    <div class="table-responsive">
      <table
        class="table table-bordered table-striped table-hover align-middle"
      >
        <thead class="table-dark">
          <tr>
            <th scope="col">{{ $t("reports.id") }}</th>
            <th scope="col">{{ $t("reports.name") }}</th>
            <th scope="col">{{ $t("reports.model") }}</th>
            <th scope="col">{{ $t("reports.latestState") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eq in equipmentWithDetails" :key="eq.id">
            <td>{{ eq.id }}</td>
            <td>{{ eq.name }}</td>
            <td>{{ eq.modelName }}</td>
            <td>
              <span class="badge" :class="getBadgeClass(eq.latestState)">
                {{ eq.latestState }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useEquipmentDataStore } from "@/store/equipmentDataStore";
import { useI18n } from "vue-i18n";

const store = useEquipmentDataStore();
const { t } = useI18n();

onMounted(async () => {
  await Promise.all([
    store.fetchEquipment(),
    store.fetchEquipmentModels(),
    store.fetchStateHistory(),
    store.fetchStates(),
  ]);
});

const equipmentWithDetails = computed(() => {
  return store.equipment.map((equipment) => {
    const model = store.getModelById(equipment.equipmentModelId);
    const latestState = store.getLatestState(equipment.id);
    const stateDetails = latestState
      ? store.getStateById(latestState.equipmentStateId)
      : undefined;

    return {
      ...equipment,
      modelName: model?.name ?? t("reports.modelNotFound"),
      latestState: stateDetails?.name ?? t("reports.stateNotFound"),
    };
  });
});

function getBadgeClass(stateName: string) {
  switch (stateName.toLowerCase()) {
    case t("reports.active").toLowerCase():
    case t("reports.operating").toLowerCase():
      return "bg-success";
    case t("reports.inactive").toLowerCase():
    case t("reports.maintenance").toLowerCase():
      return "bg-warning text-dark";
    case t("reports.deactivated").toLowerCase():
      return "bg-danger";
    default:
      return "bg-secondary";
  }
}
</script>
