<script lang="ts" setup>
import type { Equipment } from '~/types/types'

const props = defineProps<{
  equipments: Equipment[]
}>()

const emits = defineEmits<(e: 'card-clicked', id: string) => void>()
</script>

<template>
  <div class="flex max-h-[calc(100vh-200px)] flex-col overflow-y-auto">
    <template v-if="equipments.length">
      <AsideCard v-for="equipment in props.equipments" :id="equipment.id" :key="equipment.id" :name="equipment.name" :model="equipment.model" :state="equipment.lastState.equipmentStateId" @card-clicked="() => emits('card-clicked', equipment.id)" />
    </template>
    <template v-else>
      <p class="text-center text-foreground/70">
        Nenhum equipamento encontrado
      </p>
    </template>
  </div>
</template>
