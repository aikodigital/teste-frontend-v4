<template>
    <div v-if="selectedEquipment" class="w-full max-w-4xl rounded-lg text-white space-y-4">
        <h2 class="text-white font-semibold text-lg md:text-2xl uppercase mb-3">Detalhes do Equipamento</h2>

        <div class="space-y-2">
            <p class="text-md"><span class="font-semibold">Nome:</span> {{ selectedEquipment.name }}</p>
            <p class="text-md"><span class="font-semibold">Modelo:</span> {{ selectedEquipment.model?.name }}</p>
            <p class="text-md"><span class="font-semibold">Última Localização:</span> {{ selectedEquipment.position.lat
                }}, {{ selectedEquipment.position.lon }}</p>
        </div>

        <div class="flex items-center gap-2 mt-4">
            <span class="font-semibold text-md">Status:</span>
            <div class="flex items-center py-2 px-4 bg-gray-800 rounded-full">
                <div class="w-4 h-4 rounded-full"
                    :style="{ backgroundColor: selectedEquipment.states[selectedEquipment.states.length - 1]?.color || '#gray' }">
                </div>
                <span class="ml-2">
                    {{ selectedEquipment.states.length > 0
                        ? selectedEquipment.states[selectedEquipment.states.length - 1]?.name
                        : 'Nenhum Status disponível'
                    }}
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