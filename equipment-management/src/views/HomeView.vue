<template>
  <div class="min-h-screen flex flex-col">
    <nav class="flex flex-row bg-[#003480] text-white p-4 top-0 w-full z-20">
      <div class="container mx-auto flex items-center">
        <img src="/img/aiko.png" alt="Logo" class="h-8">
      </div>
    </nav>
    <div class="flex flex-1 justify-center pt-20 p-6">
      <aside class="basis-104 hidden md:block bg-white border border-gray-200 p-6 rounded-lg  h-160">
        <div class="space-y-4">
          <search-bar class="pb-4" />
          <equipment-filter />
        </div>
      </aside>

      <main class="relative basis-118 container mx-auto pl-4 mt-16 mb-16 flex-grow overflow-hidden">
        <map-component @equipment-selected="handleEquipmentSelect" />
        <transition name="slide-fade">
          <equipment-sidebar v-if="selectedEquipment" :equipment="selectedEquipmentWithDetails"
            @show-history="handleShowHistory" @close="selectedEquipment = null" />
        </transition>
      </main>
    </div>

    <footer class="bg-[#003480] text-white p-4 bottom-0 w-full">
      <div class="container mx-auto flex justify-between items-center">
        <span class="text-sm">© {{ new Date().getFullYear() }} Andressa Biagi. Todos os direitos reservados.</span>
        <img src="/img/aiko.png" alt="Logo" class="h-8">
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import MapComponent from '../components/MapComponent.vue'
import EquipmentSidebar from '../components/EquipmentSidebar.vue'
import SearchBar from '../components/SearchBar.vue'
import EquipmentFilter from '../components/EquipmentFilter.vue'
import { useEquipmentStore } from '../stores/equipment.js'

const equipmentStore = useEquipmentStore()
const selectedEquipment = ref(equipmentStore.selectedEquipment)

const selectedEquipmentWithDetails = computed(() => {
  console.log("HomeView - Selected Equipment:", selectedEquipment.value)
  if (!selectedEquipment.value) {
    console.log("No equipment selected")
    return null
  }
  const details = equipmentStore.getEquipmentDetails(selectedEquipment.value.id)
  console.log("Equipment Details:", details)
  return details
})

const handleEquipmentSelect = (equipment) => {
  selectedEquipment.value = equipment;
  equipmentStore.selectEquipment(equipment);
  console.log("Equipment selected:", equipment);
}

const handleShowHistory = async (equipmentId) => {
  await equipmentStore.loadPositionHistory(equipmentId)
  //await equipmentStore.getEquipmentDetails(equipmentId)
  // O MapComponent irá observar as mudanças no histórico
}
watch(selectedEquipmentWithDetails, (newVal) => {
  console.log("selectedEquipmentWithDetails changed:", newVal)
})
onMounted(async () => {
  await equipmentStore.loadInitialData()
})
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 0.8rem;
  will-change: transform;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50%);

}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
}

@media (max-width: 767px) {
  .equipment-sidebar {
    width: 70% !important;
  }
}
</style>