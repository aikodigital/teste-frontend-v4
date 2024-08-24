<template>
  <section class="flex items-center justify-center w-full h-full home-section">
    <div class="flex flex-col gap-4">
      <div class="flex items-center">
        <img src="@/assets/img/dodo-logo.png" alt="doodo" width="100">
        <span class="text-2xl font-bold text-zinc-200">Dodo</span>
        <span class="text-2xl font-bold text-green-700">Agro</span>
      </div>
      <Button class="shadow-md shadow-zinc-800 hover:bg-zinc-800">
        Entrar
      </Button>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/ui/button/Button.vue" ;
export default defineComponent({
  components: {
    Button,
  },
});
</script>
<style scoped>
.home-section {
  background-image: url("@/assets/img/background.png");
  background-size: cover;
  background-position: center;
}
</style>
