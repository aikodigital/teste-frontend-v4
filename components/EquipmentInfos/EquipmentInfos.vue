<script lang="ts" setup>
import { STATE } from '~/constants/state'
import type { Equipment, IEquipmentState, IState } from '~/types/types'
import { getStateColor, getStateName } from '~/utils/stateUtils'

const props = defineProps<{
  equipment: Equipment
}>()

const { productivity, calcEquipmentGains } = useEquipmentMetrics(props.equipment)

function formatToBrl(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<template>
  <div class="flex size-full max-h-80 w-full flex-col items-center gap-2 overflow-hidden">
    <h2 class="text-lg font-semibold">
      {{ props.equipment.model }} - {{ props.equipment.name }}
    </h2>
    <Badge :class="getStateColor(equipment.lastState.equipmentStateId)" class="hover:bg-initial">
      {{ getStateName(equipment.lastState.equipmentStateId) }}
    </Badge>

    <div class="flex flex-col gap-2">
      <Badge variant="outline" class="flex gap-1">
        <Icon name="lucide:percent" size="18" /> <span class="font-semibold">Produtividade:</span>{{ productivity }}%
      </Badge>
      <Badge variant="outline" class="flex gap-1">
        <Icon name="lucide:dollar-sign" size="18" /> <span class="font-semibold">Ganhos:</span>{{ formatToBrl(calcEquipmentGains) }}
      </Badge>
    </div>

    <Sheet>
      <SheetTrigger as-child>
        <Button size="sm" variant="outline">
          Histórico de estados
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right" class="mx-auto flex h-auto w-full !max-w-sm flex-col items-start"
      >
        <SheetHeader>
          <SheetTitle>Histórico de Estados</SheetTitle>
        </SheetHeader>
        <div class="size-full overflow-y-auto">
          <slot />
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
