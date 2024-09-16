<template>
  <div v-if="dialogVisible" class="dialogOverlay">
    <div class="dialogContent">
      <div class="dialogHeader">
        <h3>{{ selectedEquipment?.name }}</h3>
      </div>
      <div class="dialogBody">
        <ul class="stateList">
          <li v-for="(state, index) in selectedEquipmentHistory" :key="index" class="stateItem">
            <span class="stateIcon" :style="{ color: state.statusColor }">
              <i :class="models.getModelIcon(selectedEquipment?.modelId)" class="fa"></i>
            </span>
            <div class="stateInfo">
              <div class="stateTitle">{{ state.statusName }}</div>
              <div class="stateDate">{{ formatDate(state.date) }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="dialogFooter">
        <button class="btnModel" @click="closeDialog">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { useDateFormat } from '../services/DateFormat';
import { getModels } from '../services/Models';

const models = getModels()
const dateFormat = useDateFormat();
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

const formatDate = (date: string) => dateFormat.formattedDate(date);
</script>

<style scoped>
.dialogOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialogContent {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.dialogHeader {
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.dialogBody {
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}

.stateList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stateItem {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.stateIcon {
  margin-right: 10px;
  font-size: 24px;
}

.stateInfo {
  flex-grow: 1;
}

.stateTitle {
  font-weight: bold;
}

.stateDate {
  font-size: 0.9em;
  color: gray;
}

.dialogFooter {
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
}

.btn {
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #1976d2;
}

.btn:hover {
  background-color: #155a9d;
}
</style>
