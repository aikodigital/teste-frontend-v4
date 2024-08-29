<script setup lang="ts">
import EquipmentWithLastPosition from '@/common/types/EquipmentWithLastPosition';
import { twMerge } from 'tailwind-merge';
import { pickColor, variantColor } from '@/common/utils/helpers';
import Input from '@/components/ui/input/Input.vue';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ref } from 'vue';

const props = defineProps<{
  equipments: EquipmentWithLastPosition[],
}>()

function formatDate(date: string | undefined): string {
  if (!date) return ''
  return new Date(date).toLocaleString()
}

const filter = ref('')

function filterEquipments(): EquipmentWithLastPosition[] {
  if(!filter.value) return props.equipments;
  return props.equipments.filter(equipment => {
    const json = JSON.stringify(equipment).toLowerCase();
    const date = formatDate(equipment.lastPosition?.date).toLowerCase();
    return (json + date).includes(filter.value.toLowerCase());
  })
}
</script>

<template>
  <section class="flex flex-col items-end gap-2 px-8 h-[600px] w-[800px]">
    <Input class="h-8 w-42" placeholder="Filtrar" v-model="filter"/>
    <div class="h-full bg-zinc-50 rounded-t-xl">
      <Table class="rounded-full">
        <TableHeader class="bg-zinc-900 text-zinc-50">
          <TableRow>
            <TableHead :class="twMerge('rounded-tl-lg text-zinc-50', !filterEquipments().length ? 'w-[180px]' : '')">
              Equipamento 
            </TableHead>
            <TableHead class="text-zinc-50 max-[1400px]:hidden table-cell">Modelo</TableHead>
            <TableHead class="text-zinc-50">Ultima Posição</TableHead>
            <TableHead class="rounded-tr-lg text-zinc-50">Ultimo Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="bg-zinc-50">
          <TableRow 
          v-for="(equipment, index) in filterEquipments()" v-bind:key="equipment.id"
          class="cursor-pointer"
          @click="$emit('navigate', equipment)"
          >
            <TableCell class="flex items-center gap-2 text-xs font-medium">
              <span class="font-semibold">
                {{ equipment.name }}
              </span>
              <div :class="twMerge('w-2 h-2 rounded-full', pickColor(index))"/>
            </TableCell>
            <TableCell class="text-xs font-medium max-[1400px]:hidden table-cell"> {{ equipment.model?.name }} </TableCell>
            <TableCell class="text-xs font-medium"> {{ formatDate(equipment.lastPosition?.date) }} </TableCell>
            <TableCell>
              <div :class="twMerge('text-xs font-semibold rounded-sm h-5 flex items-center justify-center', equipment.lastState && variantColor(equipment.lastState?.id))">
                {{ equipment.lastState?.name }}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </section>
</template>