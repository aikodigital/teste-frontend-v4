<script lang="ts" setup>

</script>

<template>
  <div class="flex size-full flex-col items-start gap-4">
    <div class="flex flex-col items-start gap-2">
      <p class="font-semibold">
        Aparelhos
      </p>
      <div class="flex flex-col items-start gap-2">
        <p class="flex items-center gap-1">
          <Icon name="mdi:truck" size="24" /><span>Caminhão de carga</span>
        </p>
        <p class="flex items-center gap-1">
          <Icon name="mdi:excavator" size="24" /><span>Harvester</span>
        </p>
        <p class="flex items-center gap-1">
          <Icon name="game-icons:claws" size="24" /><span>Garra traçadora</span>
        </p>
      </div>
    </div>
    <Separator />
    <div class="flex flex-col items-start gap-2">
      <p class="font-semibold">
        Estados
      </p>
      <div class="flex flex-col items-start gap-2">
        <p class="flex items-center gap-1">
          <span class="size-4 rounded-full bg-operating" /><span>Operando</span>
        </p>
        <p class="flex items-center gap-1">
          <span class="size-4 rounded-full bg-stopped" /><span>Parado</span>
        </p>
        <p class="flex items-center gap-1">
          <span class="size-4 rounded-full bg-maintenance" /><span>Manutenção</span>
        </p>
      </div>
    </div>
  </div>
</template>
