<template>
  <div class="h-[80vh] w-auto">
    <div class="py-4 space-y-11 lg:space-y-0 lg:flex justify-between items-center">
      <EquipmentFilter />
      <EquipmentSearch />
    </div>
    <LMap ref="map" :zoom="4" :center="[-14.235004, -51.92528]">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors" />
      <LMarker v-for="eq in filteredEquipment" :key="eq.id" :lat-lng="getLatLng(eq.id)" @click="openPopup(eq.id)">
        <LIcon :icon-url="getIconUrl(eq.id)" :icon-size="iconSize" />
      </LMarker>
    </LMap>
    <EquipmentPopup v-if="selectedEquipment" :equipment="selectedEquipment" @close="closePopup" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
import EquipmentFilter from '@/components/EquipmentFilter.vue'
import EquipmentSearch from '@/components/EquipmentSearch.vue'
import EquipmentPopup from '@/components/EquipmentPopup.vue'
import { useMapIcons } from '../composables/useMapIcons'
import { useMapMarkers } from '../composables/useMapMarkers'

const store = useEquipmentStore()
const selectedEquipment = ref(null)
const { iconSize, getIconUrl } = useMapIcons()
const { getLatLng } = useMapMarkers(store)
const filteredEquipment = computed(() => store.filteredEquipment)

onMounted(async () => {
  await store.fetchData()
  store.applyFilters()
})

function openPopup(equipmentId: string) {
  selectedEquipment.value = store.equipment.find(eq => eq.id === equipmentId)
}

function closePopup() {
  selectedEquipment.value = null
}
</script>