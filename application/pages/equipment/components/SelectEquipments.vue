<template>
  <div class="w-full relative z-20">
    <div
      v-show="searchFocus"
      class="fixed inset-0 bg-transparent w-screen h-screen"
      @click="setSearchFocus(false)"
    >
      <span class="sr-only">Close equipment dropdown</span>
    </div>

    <div class="relative">
      <label class="cursor-pointer">
        <input
          v-model="search"
          class="w-full p-2 z-0 focus:outline-none bg-slate-100"
          type="text"
          placeholder="Selecione um equipamento"
          @focus="setSearchFocus(true)"
          @keyup="isTyping = true"
        >

        <div class="absolute text-indigo-800 top-0 right-0 z-10 h-full w-10 flex items-center justify-center">
          <PhosphorIconCaretDoubleUp
            v-if="searchFocus"
            weight="thin"
            size="24"
          />
          <PhosphorIconCaretDoubleDown
            v-else
            weight="thin"
            size="24"
          />
        </div>
      </label>
    </div>

    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <template v-if="searchFocus">
        <ul class="flex flex-col absolute top-10 left-0 w-full shadow-lg">
          <li
            v-for="(equipment, index) in data?.filter(
              e => (
                !isTyping ? e 
                : e.name.toLowerCase().includes(search.toLocaleLowerCase())
              )
          )"
            :key="equipment.id"
            class="list-item"
            :class="{
              'bg-slate-200': index%2 === 0,
              'bg-slate-300': index%2 !== 0,
              '!bg-indigo-500 !text-white': equipment.id === selecetedId
            }"
            @click="setSelectedEquipment(equipment.id, equipment.equipmentModelId, equipment.name)"
          >
            {{ equipment.name }} {{ index }}
            <PhosphorIconCheckCircle
              v-if="equipment.id === selecetedId"
              weight="fill"
              size="20"
              class="text-white"
            />
            <PhosphorIconCircle
              v-else
              weight="regular"
              size="20"
              class="text-gray-400"
            />
          </li>
        </ul>
      </template>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type ChangeEquipmentEmit from '~/interfaces/admin/equipment/ChangeEquipmentEmit'

const emit = defineEmits(['change-equipment'])

const { data } = await useFetch(
  '/api/equipment',
)

const search = ref<string>('') 
const searchFocus = ref<boolean>(false)
const selecetedId = ref<string>('')
const isTyping = ref<boolean>(false)

const setSearchFocus = (status:boolean) => {
  searchFocus.value = status
  isTyping.value = false
}

const setSelectedEquipment = (id: string, idModel: string, equipmentName: string) => {
  selecetedId.value = id
  search.value = equipmentName
  setSearchFocus(false)
  const change: ChangeEquipmentEmit = {
    id,
    idModel,
    equipmentName
  }
  emit('change-equipment', change)
}

</script>

<style scoped>
.list-item {
  @apply 
    p-2
    text-sm
    cursor-pointer
    flex
    flex-row
    items-center
    justify-between
    text-slate-600
    hover:brightness-90
    transition-all
}
</style>

