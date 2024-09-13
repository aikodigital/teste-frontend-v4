<template>
  <v-dialog
    v-model:modelValue="dialogVisible"
    max-width="700px"
    max-height="500px"
    scrollable
  >
    <v-card>
      <v-card-title class="d-flex justify-center">
        {{ selectedEquipment?.name }}
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(state, index) in selectedEquipmentHistory"
            :key="index"
          >
            <template v-slot:prepend>
              <v-icon
                :icon="modelStore.getModelIcon(selectedEquipment?.modelId)"
                :color="state.statusColor"
              ></v-icon>
            </template>
            <v-list-item-content>
              <v-list-item-title>{{ state.statusName }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatDate(state.date) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" @click="closeDialog">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { useDateStore } from '@/stores/DateStore';
import { useModelStore } from '@/stores/ModelStore';

const modelStore = useModelStore()
const dateStore = useDateStore();
const props = defineProps({
  modelValue: Boolean,
  selectedEquipment: Object,
  selectedEquipmentHistory: Array,
});

const emit = defineEmits(["update:modelValue"]);

const dialogVisible = computed(() => props.modelValue);

const closeDialog = () => {
  emit("update:modelValue", false);
};

const formatDate = (date: string) => dateStore.formattedDate(date);
</script>
