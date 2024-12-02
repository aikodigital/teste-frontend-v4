<template>
    <div class="m-10 -mb-10">
        <h2 class="text-3xl font-bold">Máquinas</h2>
    </div>
    <div class="m-10 flex flex-row lg:gap-6 flex-wrap justify-start">
        <div v-for="item in equipmentList" :key="item.id" class="
                w-full
                lg:w-60 
                h-40
                mt-10 
                flex
                items-center 
                justify-center 
                rounded-lg 
                border 
                border-stone-200 
                gap-4
                hover:cursor-pointer 
                hover:border-stone-200
                hover:bg-stone-100
                " @click="toggleInformation(item.equipmentModelId)">
            <img src="../../assets/img/machine2.png" alt="Machine"
                class="w-16 animate__animated animate__pulse animate__infinite" />
            <span class="font-bold text-2xl">{{ item.name }}</span>
        </div>
    </div>

    <DrawerDefault modal="true" style="width: 30rem;" :visible="isMenuOpen" position="right"
        header="Informação da máquina" :dismissable="true" :showCloseIcon="true" @update:visible="isMenuOpen = $event">
        <template #default>
            <div v-if="selectedModel" class="p-4">
                <h3 class="text-lg font-bold mb-4">{{ selectedModel.name }}</h3>
                <ul class="space-y-2">
                    <li v-for="earning in selectedModel.hourlyEarnings" :key="earning.equipmentStateId"
                        class="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                        <span class="flex items-center">
                            <span v-if="getStateById(earning.equipmentStateId)"
                                :style="{ backgroundColor: getStateById(earning.equipmentStateId)?.color }"
                                class="w-4 h-4 rounded-full mr-2"></span>
                            {{ getStateById(earning.equipmentStateId)?.name || 'Estado Desconhecido' }}
                        </span>
                        <span class="text-sm font-medium">Valor: {{ earning.value }}</span>
                    </li>
                </ul>
            </div>
            <div v-else class="p-4">
                <p class="text-gray-500">Nenhuma informação encontrada.</p>
            </div>
        </template>
    </DrawerDefault>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { equipmentList, modelList, states } from '../../utils/data';
import DrawerDefault from '../../components/Drawer/DrawerDefault.vue';

const isMenuOpen = ref(false);
const selectedModel = ref(null);


const toggleInformation = (modelId: string) => {
    const model = modelList.find((m) => m.id === modelId);
    if (model) {
        selectedModel.value = model;
        isMenuOpen.value = true;
    }
}

const getStateById = (stateId: string) => {
    return states.find((state) => state.id === stateId);
};

</script>