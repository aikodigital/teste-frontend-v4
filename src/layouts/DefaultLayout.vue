<template>
  <div class="flex">
    <div class="h-screen w-80 fixed top-0 left-0 bg-gray-800 text-white shadow-lg z-10">
      <div class="flex flex-col h-screen">
        <div class="flex items-center justify-center p-4">
          <Image :src="Logo" alt="Image" width="100" />
        </div>

        <div class="flex-1 p-4 overflow-y-auto">
          <EquipmentList />
        </div>

        <footer class="p-4 text-center text-sm border-t border-gray-700">
          &copy; 2025 Case técnico | Desenvolvedor Frontend - Aiko
        </footer>
      </div>
    </div>

    <div class="flex-1 ml-80 bg-gray-100 min-h-screen">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/img/aiko.png'
import EquipmentList from '@/components/equipment/EquipmentList.vue'
</script>
