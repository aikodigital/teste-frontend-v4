<script setup lang="ts">
import { computed } from 'vue'
import { useEquipmentStore } from '@/store/useEquipmentStore'
import {
  Stepper,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
  StepperTrigger,
} from '@/components/ui/stepper'

import { AlertCircle, CheckCircle2, Loader2, Info } from 'lucide-vue-next'

// Ícones personalizados por status (ajuste conforme seus estados)
const stateIcons: Record<string, any> = {
  ativo: CheckCircle2,
  inativo: AlertCircle,
  manutencao: Loader2,
  // estado padrão
  default: Info,
}

const store = useEquipmentStore()

const timeline = computed(() => {
  if (!store.selectedEquipmentId) return []
  const history = store.filteredData.stateHistory[store.selectedEquipmentId] || []
  // Inverter a ordem: mais recente no topo
  return [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

function getIcon(stateId: string) {
  const stateName = store.getEquipmentStateName(stateId)?.toLowerCase()
  return stateIcons[stateName] || stateIcons.default
}

function getColor(stateId: string): string {
  return store.getEquipmentStateColor(stateId) || '#999'
}
</script>

<template>
  <div class="mt-6 rounded-md border border-gray-200" style="height: 40vh; overflow-y: auto;">
    <template v-if="!store.selectedEquipmentId">
      <div class="flex flex-col items-center justify-center h-full text-gray-500">
        <Info class="h-10 w-10 mb-2" />
        <p class="font-medium">Nenhum equipamento selecionado</p>
      </div>
    </template>

    <template v-else>
      <p class="font-medium pt-8 pl-8">Histórico de Estados do Equipamento</p>
      <Stepper orientation="vertical" class="mx-auto flex w-full flex-col gap-10 p-8">
        <StepperItem v-for="(entry, index) in timeline" :key="index" :step="index + 1"
          class="relative flex w-full items-start gap-6 ">
          <!-- linha vertical -->
          <StepperSeparator v-if="index !== timeline.length - 1"
            class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted" />

          <!-- ícone -->
          <StepperTrigger as-child>
            <button class="z-10 rounded-full shrink-0 p-2"
              :style="{ backgroundColor: getColor(entry.equipmentStateId) }">
              <component :is="getIcon(entry.equipmentStateId)" class="text-white h-5 w-5" />
            </button>
          </StepperTrigger>

          <!-- texto -->
          <div class="flex flex-col gap-1">
            <StepperTitle class="text-sm font-semibold">
              {{ store.getEquipmentStateName(entry.equipmentStateId) }}
            </StepperTitle>
            <StepperDescription class="text-xs text-muted-foreground">
              {{ new Date(entry.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) }}
            </StepperDescription>
          </div>
        </StepperItem>
      </Stepper>
    </template>
  </div>
</template>
