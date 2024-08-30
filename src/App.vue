<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Auth from '@/layout/Auth.vue';
import Default from '@/layout/Default.vue';

const route = useRoute()
const layouts: any = {
  auth: Auth,
  default: Default
}
const layout = computed(() => {
  const itemLayout: any = route.meta.layout || 'default'
  return layouts[itemLayout]
})
</script>

<template>
  <div class="h-screen w-screen">
  <component :is="layout">
    <router-view />
  </component>
  </div>
</template>
