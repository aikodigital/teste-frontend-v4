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

const { selectedModel } = useEquipmentFilter();
const equipmentModels = getModels();

const iconChevronDown = 'fa6-solid:chevron-down';
const iconCheck = 'fa6-solid:check';
const iconXMark = 'fa6-solid:xmark';

const emit = defineEmits(['update:selectedModel']);
watch(selectedModel, (newValue) => {
  emit('update:selectedModel', newValue);
});
</script>

<template>
  <div class="flex gap-0.5 w-full">
    <SelectRoot v-model="selectedModel">
      <SelectTrigger
        class="flex items-center justify-between w-full rounded-md px-1 pl-4 gap-1 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none border border-black"
        aria-label="Selecione um modelo">
        <SelectValue placeholder="Selecione um modelo" />

        <Icon :name="iconChevronDown" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          class="h-fit border border-black bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[99999]"
          :side-offset="5" position="popper">
          <SelectViewport class="py-1">
            <SelectGroup class="divide-y divide-black">
              <SelectItem v-for="(model, index) in equipmentModels" :key="index"
                class="leading-none flex items-center py-2 px-6 relative cursor-pointer focus-visible:outline-none"
                :value="model">
                <SelectItemIndicator class="absolute left-1.5">
                  <Icon :name="iconCheck" />
                </SelectItemIndicator>

                <SelectItemText>
                  {{ model }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <button class="border border-black rounded-md flex items-center gap-1 px-2 w-fit" aria-label="Limpar seleção"
      @click="selectedModel = ''">
      <Icon :name="iconXMark" />
    </button>
  </div>
</template>