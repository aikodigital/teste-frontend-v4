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
          class="w-full p-2 z-0 focus:outline-none appearance-none"
          type="text"
          placeholder="Select an equipment"
          @focus="setSearchFocus(true)"
          @keyup="isTyping = true"
        >

        <div class="absolute text-emerald-700 top-0 right-0 z-10 h-full w-10 flex items-center justify-center">
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

    <Transition>
      <template v-if="searchFocus">
        <ul class="flex flex-col absolute top-10 left-0 w-full">
          <li
            v-for="(equipment, index) in data?.filter(
              e => (
                !isTyping ? e 
                : e.name.toLowerCase().includes(search.toLocaleLowerCase())
              )
          )"
            :key="equipment.id"
            class="p-2 text-sm cursor-pointer flex flex-row items-center justify-between text-gray-800"
            :class="index%2 === 0 ? 'bg-slate-300' : 'bg-slate-400'"
            @click="setSelectedEquipment(equipment.id, equipment.equipmentModelId, equipment.name)"
          >
            {{ equipment.name }} {{ index }}
            <PhosphorIconCheckCircle
              v-show="equipment.id === selecetedId"
              weight="thin"
              size="25"
              class="text-emerald-700"
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

const setSelectedEquipment = (id: string, idModel: string, name: string) => {
  selecetedId.value = id
  search.value = name
  setSearchFocus(false)
  const change: ChangeEquipmentEmit = {
    id,
    idModel
  }
  emit('change-equipment', change)
}

</script>

