<template>
  <div class="flex">
    <div
      class="flex flex-col items-center md:h-screen md:w-80 h-96 fixed top-0 left-0 bg-gray-800 text-white shadow-lg z-10"
    >
      <Image :src="Logo" alt="Image" width="100" />

      <div class="flex-1 p-4 overflow-y-auto">
        <EquipmentList />
      </div>

      <footer class="p-4 text-center text-sm border-t border-gray-700">
        &copy; 2025 Case técnico | Desenvolvedor Frontend - Aiko
      </footer>
    </div>

    <div class="flex-1 md:ml-80 mt-96 md:mt-0 bg-gray-100 min-h-screen">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/img/aiko.png'
import EquipmentList from '@/components/equipment/EquipmentList.vue'
</script>
