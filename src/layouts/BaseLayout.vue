<template>
  <div class="d-flex flex-column vh-100">
    <BaseHeader />
    <div class="d-flex flex-grow-1">
      <BaseSidebar />
      <main class="flex-grow-1 p-3">
        <slot></slot>
      </main>
    </div>
    <BaseFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseHeader from "@/components/BaseHeader.vue";
import BaseSidebar from "@/components/BaseSidebar.vue";
import BaseFooter from "@/components/BaseFooter.vue";

export default defineComponent({
  name: "BaseLayout",
  props: {
    msg: {
      type: String,
      default: "Hello, World!",
    },
  },
  components: {
    BaseHeader,
    BaseSidebar,
    BaseFooter,
  },
});
</script>

<style scoped></style>
