<script setup lang="ts">
import Button from "@/components/ui/button/button.vue" ;
</script>
<template>
  <section class="flex items-center justify-center w-full h-full">
    <div class="flex flex-col gap-4">
      <div class="flex items-center">
        <img src="@/assets/img/dodo-logo.png" alt="doodo" width="100">
        <span class="text-2xl font-bold text-zinc-200">Dodô</span>
        <span class="text-2xl font-bold text-green-700">Agro</span>
      </div>
      <Button class="shadow-md shadow-zinc-800 hover:bg-zinc-800" @click="$router.push('/app')">
        Entrar
      </Button>
    </div>
  </section>
</template>

