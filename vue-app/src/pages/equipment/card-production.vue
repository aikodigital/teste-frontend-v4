<script setup lang="ts">
import { EquipmentProduction } from '@/common/types/EquipmentProduction';
import { twMerge } from 'tailwind-merge';
import { defineProps } from 'vue';

const {productivy, date, earning} = defineProps<EquipmentProduction>();

function formatDateUTC(date: string){
    const v1 = new Date(date);
    v1.setHours(v1.getHours() + 3);
    return v1.toLocaleDateString();
}
</script>
<template>
    <div class="bg-white w-full h-20 rounded-lg py-2 px-4 flex flex-row justify-between items-center">
        <div>
            <span class="font-semibold text-zinc-800">
                Produtividade:
            </span>
            <span class="font-semibold text-blue-900">
                {{Math.round(productivy)}}%
            </span>
            <div class="text-sm font-semibold text-zinc-500">
                {{formatDateUTC(date)}}
            </div>
        </div>
        <div :class="twMerge(`text-lg font-semibold self-end`, earning >= 0 ? 'text-emerald-500' : 'text-red-500')">
            {{ earning.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}
        </div>
    </div>
</template>
<style scoped>

</style>
  