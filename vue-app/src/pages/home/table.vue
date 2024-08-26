<script setup lang="ts">
import EquipmentWithLastPosition from '@/common/types/EquipmentWithLastPosition';
import { twMerge } from 'tailwind-merge';
import { pickColor } from '@/common/utils/helpers';
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

function variantColor(stateId: string): string {
    const states = [
    {
      id: "0808344c-454b-4c36-89e8-d7687e692d57",
      name: "Operando",
      color: "#2ecc71",
      twBg: "bg-green-500"
    },
    {
      id: "baff9783-84e8-4e01-874b-6fd743b875ad",
      name: "Parado",
      color: "#f1c40f",
      twBg: "bg-yellow-500"
    },
    {
      id: "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f",
      name: "Manutenção",
      color: "#e74c3c",
      twBg: "bg-red-500"
    }
  ]

  return states.find(state => state.id === stateId)?.twBg || ''
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
  <section class="flex flex-col items-end gap-2 px-8 h-[600px]">
    <Input class="h-8 w-42" placeholder="Filtrar" v-model="filter"/>
    <div class="h-full bg-zinc-200 rounded-t-xl">
      <Table class="rounded-full">
        <TableHeader class="bg-zinc-900 text-zinc-50">
          <TableRow>
            <TableHead class="rounded-tl-lg text-zinc-50">
              Equipamento 
            </TableHead>
            <TableHead class="text-zinc-50">Modelo</TableHead>
            <TableHead class="text-zinc-50">Ultima Posição</TableHead>
            <TableHead class="rounded-tr-lg text-zinc-50">Ultimo Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="bg-zinc-200">
          <TableRow 
          v-for="(equipment, index) in filterEquipments()" v-bind:key="equipment.id"
          class="cursor-pointer"
          @click="$emit('navigate', equipment)"
          >
            <TableCell class="flex items-center gap-2 text-xs font-medium">
              <span>
                {{ equipment.name }}
              </span>
              <div :class="twMerge('w-2 h-2 rounded-full', pickColor(index))"/>
            </TableCell>
            <TableCell class="text-xs font-medium"> {{ equipment.model?.name }} </TableCell>
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