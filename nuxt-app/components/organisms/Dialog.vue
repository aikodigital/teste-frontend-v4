<template>
  <v-dialog v-model="dialog" class="dialog-content">
    <v-card>
      <v-card-title style="display: flex">
        <span>{{ title }} - Histórico de estados</span>
        <v-spacer />
        <v-icon class="close-icon" @click="closeDialog"> mdi-close </v-icon>
      </v-card-title>

      <v-card-subtitle>
        <v-timeline align="center" side="end">
          <v-timeline-item
            v-for="(item, key) in dataDialog"
            :key="key"
            :dot-color="getColor(item.equipmentStateId)"
            size="small"
          >
            <div class="d-flex">
              <strong class="me-4">{{ formatDateTime(item.date) }}</strong>
              <div>
                <strong>{{ getSituation(item.equipmentStateId) }}</strong>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-subtitle>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEventBus } from '@/utils/eventBus.ts';
import type {
  IEquipmentNormalized,
  IStatesHistory,
} from '~/interfaces/equipments.interface';
import { formatDateTime } from '@/utils/date-formatter.ts';

const dialog = ref(false);
let dataDialog: IStatesHistory[];
let title: string;
const store = useNormalizedData();
const { on } = useEventBus();

on('openDialog', (data: IEquipmentNormalized) => {
  openDialog();
  dataDialog = data.stateHistory.states;
  title = data.name;
});

function closeDialog() {
  dialog.value = false;
}

function openDialog() {
  dialog.value = true;
}

function getColor(equipmentStateId: string) {
  return store.states.find((state) => state.id === equipmentStateId)?.color;
}

function getSituation(equipmentStateId: string) {
  return store.states.find((state) => state.id === equipmentStateId)?.name;
}
</script>

<style scoped>
.close-icon {
  cursor: pointer;
  font-size: 24px;
  color: #000;
}

.dialog-content .v-card {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
}

.dialog-content .v-card-title {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.dialog-content .v-card-subtitle {
  flex: 1;
  overflow-y: auto;
}
</style>
