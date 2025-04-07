<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Map from '../components/Map.vue'
  import Subtitle from '../components/Subtitle.vue'
  import dataEquipmentModel from '../../../data/equipmentModel.json'
  import dataEquipmentState from '../../../data/equipmentState.json'
  import { formatData } from '../service/formatData'
  import type {
    Equipment,
    MultiSelectState,
    MultiSelectModel,
  } from '../interface/Imap'

  const equipmentOriginal = ref<Equipment[]>(formatData())
  const dataState = ref<MultiSelectState[]>([])
  const dataStateModel = ref<MultiSelectModel[]>([])
  const valueSearch = ref<string>('')
  const dataStateOption = ref<MultiSelectState[]>(
    dataEquipmentState.map((s) => {
      return {
        equipmentStateId: s.id,
        name: s.name,
      }
    }),
  )
  const dataModelOption = ref<MultiSelectModel[]>(
    dataEquipmentModel.map((m) => {
      return {
        equipmentModelId: m.id,
        name: m.name,
      }
    }),
  )

  const filteredEquipment = computed(() => {
    const hasStateFilter = dataState.value.length > 0
    const hasModelFilter = dataStateModel.value.length > 0
    const hasSearch = valueSearch.value.trim() !== ''

    if (!hasStateFilter && !hasModelFilter && !hasSearch) {
      return equipmentOriginal.value
    }

    return equipmentOriginal.value.filter((e) => {
      const matchesState =
        !hasStateFilter ||
        dataState.value
          .map((d) => d.equipmentStateId)
          .includes(e.lastState.equipmentStateId)

      const matchesModel =
        !hasModelFilter ||
        dataStateModel.value
          .map((m) => m.equipmentModelId)
          .includes(e.equipmentModelId)

      const matchesSearch =
        !hasSearch ||
        e.name.toLowerCase().includes(valueSearch.value.toLowerCase())

      return matchesState && matchesModel && matchesSearch
    })
  })
</script>

<template>
  <section class="container-main">
    <section style="margin-top: 30px; margin-bottom: 12px">
      <span class="page-title">EcoTrack</span>
    </section>
    <section class="container-filters">
      <section>
        <MultiSelect
          v-model="dataState"
          :options="dataStateOption"
          optionLabel="name"
          class="multiselect"
          placeholder="Filtre os equipamentos pelo estado atual"
          :maxSelectedLabels="2"
        />
      </section>
      <section>
        <MultiSelect
          v-model="dataStateModel"
          :options="dataModelOption"
          optionLabel="name"
          class="multiselect"
          placeholder="Filtre os equipamentos pelo modelo"
          :maxSelectedLabels="2"
        />
      </section>
      <section class="search-wrapper">
        <InputText
          type="text"
          placeholder="Pesquisar..."
          v-model="valueSearch"
          class="search-input multiselect"
          @update:model-value="
            (newValue: string | undefined) => (valueSearch = newValue ?? '')
          "
        />
        <i class="pi pi-search search-icon"></i>
      </section>
    </section>
    <section
      class="l-map"
      style="display: flex; width: 60%; flex-direction: column"
    >
      <section
        style="
          border: 2px solid #c9d8c5;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        "
      >
        <Map :maps="filteredEquipment" :positionCenter="equipmentOriginal[0]" />
      </section>
      <section>
        <Subtitle />
      </section>
    </section>
  </section>
</template>
