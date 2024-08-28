<script setup lang="ts">
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from '@/components/ui/table'
import { onMounted, ref } from 'vue';
import router from '@/router';
import EquipmentService from '@/common/services/EquipmentService';
import EquipmentStateHistory, { State } from '@/common/types/EquipmentStateHistory';
import Pagination from './pagination.vue';
import { getPaginatedItems } from '@/common/utils/helpers';
import Input from '@/components/ui/input/Input.vue';
import { twMerge } from 'tailwind-merge';
import { variantColor } from '@/common/utils/helpers';

const equipmentStates = ref<EquipmentStateHistory>();
const states = ref<State[]>([]);
const total = ref(0);
const itemsPerPage = 7;
const filter = ref('');
const pagination = ref<InstanceType<typeof Pagination>>();

onMounted(() => {
const { id } = router.currentRoute.value.params
equipmentStates.value = EquipmentService.getEquipmentHistoryStates(id as string);
total.value = equipmentStates.value?.states.length ?? 0;
updatePage(1);
})

function formatDate(date: string | undefined): string {
if (!date) return ''
return new Date(date).toLocaleString()
}

function updatePage(page: number) {
    states.value = getPaginatedItems<State>
        (page, itemsPerPage, equipmentStates.value?.states.length ?? 0, filterState() ?? []);
}

function filterState(): State[] {
  if(!filter.value) return equipmentStates.value!.states;
  return equipmentStates.value!.states.filter(state => {
    const data = EquipmentService.getStateById(state.equipmentStateId);
    const json = JSON.stringify(data).toLowerCase();
    const date = formatDate(state.date).toLowerCase();
    return (json + date).includes(filter.value.toLowerCase());
  })
}

function filterData(){
    const data = filterState();
    states.value = data.slice(0, 5);
    total.value = data.length;
    pagination.value?.updatePage(1);
}
</script>

<template>
<section class="flex flex-col items-start gap-2 px-8 h-[500px]">
<h1 class="text-xl text-zinc-50 font-semibold mb-4">
    Histórico de Estados
</h1>
<div class="flex flex-row justify-between w-full items-end">
    <div class="text-xs font-mono text-zinc-50">{{ total ?? 0 }} Registros</div>
    <Input class="h-8 w-42" placeholder="Filtrar" v-model="filter" @input="filterData"/>
</div>
<div class="h-full bg-zinc-200 rounded-t-xl flex flex-col justify-between pb-2">
    <Table class="rounded-full">
    <TableHeader class="bg-zinc-900 text-zinc-50">
        <TableRow>
        <TableHead class="rounded-tl-lg text-zinc-50 w-[200px]">
            Data
        </TableHead>
        <TableHead class="text-zinc-50 w-[200px] rounded-tr-lg">Estado</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody class="bg-zinc-200">
        <TableRow 
            v-for="state in states" v-bind:key="state.date + state.equipmentStateId"
            class="cursor-pointer"
            >
            <TableCell class="flex items-center gap-2 text-xs font-medium">
                <span>
                {{ formatDate(state.date) }}
                </span>
            </TableCell>
            <TableCell class="text-xs font-medium">
                <div :class="twMerge('text-xs font-semibold rounded-sm h-5 w-[100px] flex items-center justify-center',
                     variantColor(state.equipmentStateId))">
                    {{ EquipmentService.getStateById(state.equipmentStateId)?.name }}
                </div>
            </TableCell>
        </TableRow>
    </TableBody>
    </Table>
    <div v-if="!states.length" class="text-center text-sm">
        Nenhum registro encontrado
    </div>
    <Pagination ref="pagination" @update:page="updatePage" :items-per-page="itemsPerPage" :total="total ?? 0"/>
</div>
</section>
</template>