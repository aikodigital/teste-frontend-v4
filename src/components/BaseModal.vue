<script setup lang="ts">
import BaseBtn from '@/components/BaseBtn.vue'

interface Modal {
  model: boolean
  title: string
  btnConfirmLabel: string
  btnCancelLabel: string
}

const props = defineProps<Modal>()
const emit = defineEmits(['onCancel'])
</script>
<template>
  <q-dialog :model-value="props.model" persistent>
    <q-card class="modal-card">
      <q-card-section>
        <div class="modal-title">{{ props.title }}</div>
      </q-card-section>

      <q-card-section class="modal-content">
        <slot name="content" />
      </q-card-section>

      <q-card-actions class="q-pb-md" align="center">
        <base-btn class="confirm-btn" label="Fechar" color="primary" @click="emit('onCancel')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped>
.modal-card {
  width: 30%;
  min-width: 350px;
  max-width: 800px;
  margin: auto;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 16px;
}

.confirm-btn {
  width: 95%;
}
</style>
