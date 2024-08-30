<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
const props = defineProps<{
  equipment: any | null
  productivityData: { equipmentId: string; productivity: number } | null
  earnings: number | null
  equipmentId: any | null
}>()

const emit = defineEmits<{
  (e: 'show-history', payload: string): void
}>()

const showHistory = () => {
  emit('show-history', props.equipmentId)
}

function formatEarnings(amount) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

const formatProductivity = (percent: number) => `${percent.toFixed(2)}%`
</script>

<template>
  <div v-if="equipmentId">
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th colspan="2" class="has-text-centered">Informações do Equipamento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="has-text-weight-bold">Equipamento</td>
            <td>{{ props.equipment?.name }}</td>
          </tr>
          <tr>
            <td class="has-text-weight-bold">Estado Atual</td>
            <td>
              <div :style="{ color: equipment.stateColor }">{{ equipment?.stateName }}</div>
            </td>
          </tr>
          <tr>
            <td class="has-text-weight-bold">Produtividade</td>
            <td>
              <div v-if="productivityData">
                <p>{{ formatProductivity(productivityData?.productivity) }}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="has-text-weight-bold">Ganhos</td>
            <td>
              <div v-if="earnings !== null">
                R$ {{ formatEarnings(earnings) }}
                <!-- Agora, earnings será exibido corretamente -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.line-with-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
}
</style>
