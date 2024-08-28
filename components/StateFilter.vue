<script setup lang="ts">
/** Core */
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from 'radix-vue';

const { selectedState } = useEquipmentFilter();
const equipmentStates = getStates();

const iconChevronDown = 'fa6-solid:chevron-down';
const iconCheck = 'fa6-solid:check';
const iconXMark = 'fa6-solid:xmark';

const emit = defineEmits(['update:selectedState']);
watch(selectedState, (newValue) => {
  emit('update:selectedState', newValue);
});
</script>

<template>
  <div class="flex gap-0.5 w-full">
    <SelectRoot v-model="selectedState">
      <SelectTrigger
        class="flex items-center justify-between w-full rounded-md px-1 pl-4 gap-1 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none border border-black"
        aria-label="Selecione um estado">
        <SelectValue placeholder="Selecione um estado" />

        <Icon :name="iconChevronDown" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          class="h-fit border border-black bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[99999]"
          :side-offset="5" position="popper">
          <SelectViewport class="py-1">
            <SelectGroup class="divide-y divide-black">
              <SelectItem v-for="(state, index) in equipmentStates" :key="index"
                class="leading-none flex items-center py-2 px-6 relative cursor-pointer focus-visible:outline-none"
                :value="state">
                <SelectItemIndicator class="absolute left-1.5">
                  <Icon :name="iconCheck" />
                </SelectItemIndicator>

                <SelectItemText>
                  {{ state }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <button class="border border-black rounded-md flex items-center gap-1 px-2 w-fit" aria-label="Limpar seleção"
      @click="selectedState = ''">
      <Icon :name="iconXMark" />
    </button>
  </div>
</template>