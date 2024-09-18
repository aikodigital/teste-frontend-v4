<template>
    <div v-if="selectedEquipment" class="w-3/4 h-auto text-white space-y-3">
        <h2 class="text-white font-semibold text-2xl uppercase">Detalhes do Equipamento</h2>
        <p><span class="mr-2 font-medium">Nome:</span> {{ selectedEquipment.name }}</p>
        <p><span class="mr-2 font-medium">Modelo:</span> {{ selectedEquipment.model?.name }}</p>
        <p><span class="mr-2 font-medium">Ultima localização:</span> {{ selectedEquipment.position.lat }}, {{
            selectedEquipment.position.lon
            }}</p>
        <div class="flex mt-2 items-center">
            <span class="mr-2 font-medium">status:</span>
            <div class="bg-gray-700 flex gap-1 justify-center items-center py-2 px-4 rounded-3xl">
                <div class="size-3 rounded-full" :style="{
                    backgroundColor: selectedEquipment.states[selectedEquipment.states.length -
                        1]?.color
                }"></div>
                <span class="">
                    {{ selectedEquipment.states.length > 0 ?
                    selectedEquipment.states[selectedEquipment.states.length -
                    1]?.name : 'Nenhum Status disponível' }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Equipment } from '../stores/equipmentStore';

export default defineComponent({
    props: {
        selectedEquipment: {
            type: Object as PropType<Equipment>,
            required: false
        }
    }
});
</script>