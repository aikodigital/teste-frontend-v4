<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useEquipmentStore } from '@/store/useEquipmentStore'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'

const store = useEquipmentStore()
const filters = store.filters

const searchQuery = ref('')

// Última data real baseada nas posições
const latestDate = computed(() => {
  const allDates = Object.values(store.positionHistory)
    .flat()
    .map(p => new Date(p.date).getTime())

  return allDates.length ? new Date(Math.max(...allDates)) : new Date()
})

// Atualiza ao mudar status, tipo ou período
watch(
  () => [filters.status, filters.type],
  () => {
    store.updateFilteredEquipments()
  }
)

watch(
  () => filters.period,
  () => {
    store.updateFilteredEquipments()
  }
)

// Atualiza o filtro de busca
watch(searchQuery, (newValue) => {
  store.filters.search = newValue
  store.updateFilteredEquipments()
})

// Inicializa os dados filtrados ao montar
onMounted(() => {
  store.updateFilteredEquipments()
})
</script>

<template>
  <div class="flex flex-wrap gap-2 items-end px-4 py-2">
    <!-- Status -->
    <div class="w-40">
      <label class="text-sm text-gray-500 mb-1 block">Status</label>
      <Select v-model="filters.status">
        <SelectTrigger>
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem :value="null">Todos</SelectItem>
          <SelectItem v-for="status in store.equipmentStates" :key="status.id" :value="status.name">
            {{ status.name }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Modelo -->
    <div class="w-50">
      <label class="text-sm text-gray-500 mb-1 block">Modelo</label>
      <Select v-model="filters.type">
        <SelectTrigger>
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem :value="null">Todos</SelectItem>
          <SelectItem v-for="type in store.equipmentModels" :key="type.id" :value="type.name">
            {{ type.name }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Período -->
    <div class="w-60">
      <label class="text-sm text-gray-500 mb-1 block">Período</label>
      <ToggleGroup v-model="filters.period" variant="outline">
        <ToggleGroupItem value="1d">1d</ToggleGroupItem>
        <ToggleGroupItem value="7d">7d</ToggleGroupItem>
        <ToggleGroupItem value="30d">30d</ToggleGroupItem>
        <ToggleGroupItem value="custom">Todo</ToggleGroupItem>
      </ToggleGroup>
    </div>

    <!-- Busca -->
    <div class="w-60 relative">
      <Input id="search" v-model="searchQuery" type="text" placeholder="Pesquisar..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
  </div>
</template>
