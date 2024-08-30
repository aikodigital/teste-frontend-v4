<script setup lang="ts">
import CardProduction from './card-production.vue';
import { getEquipmentById } from '@/common/services/EquipmentService';
import { calcDailyEarning, calcDailyProductivy, calcHoursEachState, getEquipmentHistoryStates } from '@/common/services/StateService';
import { EquipmentProduction } from '@/common/types/EquipmentProduction';
import { getPaginatedItems } from '@/common/utils/helpers';
import Pagination from './pagination.vue';
import router from '@/router';
import { onMounted, ref } from 'vue';

const { id } = router.currentRoute.value.params
const total = ref(0);
const itemsPerPage = 6;
const pagination1 = ref<InstanceType<typeof Pagination>>();

const equipmentsAllDaysProduction = ref<EquipmentProduction[]>([]);
const filterData = ref<EquipmentProduction[]>([]);

function updatePage(page: number) {
    filterData.value = getPaginatedItems<EquipmentProduction>
        (page, itemsPerPage, equipmentsAllDaysProduction.value?.length ?? 0, equipmentsAllDaysProduction.value ?? []);
}

onMounted(() => {
    const equipment = getEquipmentById(id as string);
    const equipmentStates = getEquipmentHistoryStates(id as string);
    const resultAllDays = calcHoursEachState(equipmentStates?.states ?? []);

    Object.keys(resultAllDays).forEach(day => {
        const dayProduction: EquipmentProduction = {
            date: day,
            productivy: calcDailyProductivy(resultAllDays[day]),
            earning: calcDailyEarning(resultAllDays[day], equipment!.equipmentModelId)
        }
        equipmentsAllDaysProduction.value.push(dayProduction);
    })

    total.value = equipmentsAllDaysProduction.value.length;
    filterData.value = equipmentsAllDaysProduction.value.slice(0, itemsPerPage);
})
</script>
<template>
    <section class="flex flex-col items-center gap-2 px-8 w-[500px] h-full">
        <h1 class="text-xl text-zinc-50 font-semibold mb-2 self-start">
            Produção Diária
        </h1>
        <div class="flex flex-col gap-2 items-start w-full mb-4 h-[520px]">
            <CardProduction 
                v-for="production in filterData"
                :key="production.date"
                :date="production.date"
                :productivy="production.productivy"
                :earning="production.earning"
            />
        </div>
        <Pagination ref="pagination1" @update:page="updatePage" :items-per-page="itemsPerPage" :total="total ?? 0"/>
    </section>
</template>
<style scoped>

</style>
  