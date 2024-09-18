<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    :class="{ show: show }"
    :style="{ display: show ? 'block' : 'none' }"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="markerModalLabel">
            Histórico de Estados do Equipamento
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Equipamento ID: {{ equipmentId }}</p>
          <p>
            Equipamento: <span class="fw-bold">{{ equipmentName }}</span>
          </p>
          <p>
            Modelo: <span class="fw-bold">{{ modelName }}</span>
          </p>
          <table class="table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(state, index) in equipmentHistory" :key="index">
                <td>{{ new Date(state.date).toLocaleString() }}</td>
                <td :style="{ color: state.color }">{{ state.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MarkerModal",
  props: {
    equipmentId: {
      type: String,
      required: true,
    },
    equipmentHistory: {
      type: Array as PropType<{ date: string; name: string; color: string }[]>,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
    equipmentName: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped></style>
