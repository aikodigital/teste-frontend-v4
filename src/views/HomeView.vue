<script setup lang="ts">
import { ref } from 'vue'
import Maps from '../components/MapView.vue'
import EquipmentList from '../components/EquipmentList.vue'
import EquipmentInformation from '../components/EquipmentInformation.vue'
import Footer from '../components/Footer.vue'

const selectedEquipment = ref()
const selectedProductivity = ref(null)
const selectedEarnings = ref(null)
const selectedEquipmentIdForHistory = ref(null)
const selectedEquipmentId = ref<string | null>(null)

function handleRequestDetails(equipmentId: string | null) {
  if (equipmentId) {
    selectedEquipmentId.value = equipmentId
  } else {
    selectedEquipmentId.value = null
  }
}

const handleMarkerClickEquipment = (equipment: any) => {
  selectedEquipment.value = equipment
  console.log('Equipamento clicado:', equipment)

  console.log('homeview recebendo do marker', equipment)
}

const handleMarkerClickEarnings = (earnings: any) => {
  selectedEarnings.value = earnings
}

const handleMarkerClickProductivity = (productivity: any) => {
  selectedProductivity.value = productivity
}

const handleShowHistory = (equipmentId: string) => {
  selectedEquipmentId.value = equipmentId
}

const equipment = ref<any[]>([]) 

console.log('equipmentId:', selectedEquipmentId.value)
</script>
<template>
  <div class="app-container">
    <section class="section">
      <div class="container is-fullhd">
        <div class="columns">
          <div class="column is-narrow">
            <div class="box box-shadow has-text-centered is-size-7">
              <img src="@/assets/img/aiko.png" alt="Logo" class="logo" />
              <hr class="custom-hr mt-1 mb-1" />
              <div class="has-text-centered subtitle mt-1"><h1>Lista de Equipamentos</h1></div>
              <div class="mt-1">
                <EquipmentList @request-details="handleRequestDetails" />
              </div>
              <div>
                <EquipmentInformation
                  :equipment="selectedEquipment"
                  :productivityData="selectedProductivity"
                  :earnings="selectedEarnings"
                  :equipmentId="selectedEquipment ?? null"
                  :equipmentModel="equipment"
                  @show-history="handleShowHistory"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box box-shadow has-text-centered is-size-6">
              <Maps
                @marker-click="handleMarkerClickEquipment"
                @productivity-data="handleMarkerClickProductivity"
                @earnings-data="handleMarkerClickEarnings"
                :equipmentIdForHistory="selectedEquipmentIdForHistory"
                :selectedEquipmentId="selectedEquipmentId"
                :equipmentId="selectedEquipmentId"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 150px;
  height: auto;
}
.section {
  padding: 10px;
}
.body {
  background-color: white;
}
</style>
