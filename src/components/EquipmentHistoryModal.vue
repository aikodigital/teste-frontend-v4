<template>
  <AppModal
    :isVisible="isVisible"
    @update:isVisible="$emit('update:isVisible', $event)"
  >
    <div v-if="selectedEquipment">
      <h3 class="my-3">Histórico de Estado do Equipamento</h3>
      <ul>
        <li
          class="list__states"
          v-for="(state, index) in paginatedStates"
          :key="index"
        >
          <span
            :style="{ backgroundColor: getStatusColor(state.status) }"
            class="status__dot"
          ></span>
          <b>{{ formatDate(state.date) }} - {{ state.status }}</b>
        </li>
      </ul>
      <PaginationControls
        :currentPage="currentPage"
        :totalPages="totalPages"
        @prevPage="$emit('prevPage')"
        @nextPage="$emit('nextPage')"
      />
    </div>
  </AppModal>
</template>

<script>
import AppModal from "./Modal.vue";
import PaginationControls from "./PaginationControls.vue";

export default {
  name: "EquipmentHistoryModal",
  components: {
    AppModal,
    PaginationControls,
  },
  props: {
    isVisible: Boolean,
    selectedEquipment: Object,
    currentPage: Number,
    totalPages: Number,
    paginatedStates: Array,
    getStatusColor: Function,
    formatDate: Function,
  },
};
</script>

<style scoped>
h3 {
  color: #002255;
}
.list__states {
  color: #444444;
}
.status__dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>
