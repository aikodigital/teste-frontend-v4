<script lang="ts" setup>
import Fieldset from 'primevue/fieldset'
import ProgressBar from 'primevue/progressbar'

interface EquipmentDetailsProps {
  gains: string
  productivity: number
}

const { gains, productivity } = defineProps<EquipmentDetailsProps>()
</script>

<template>
  <Fieldset legend="Ganho por equipamento">
    <p
      class="m-0"
      data-cy="equipment-details-gains"
    >
      {{ gains }}
    </p>
  </Fieldset>
  <Fieldset legend="Percentual de Produtividade do equipamento">
    <ProgressBar
      :value="productivity"
      data-cy="equipment-details-productivity"
    ></ProgressBar>
  </Fieldset>
</template>
