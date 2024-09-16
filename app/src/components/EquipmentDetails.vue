<template>
    <div v-if="selectedEquipment" class="w-3/4 h-auto text-white">
        <h2 class="text-white">Detalhes do Equipamento</h2>
        <p><strong>Nome:</strong> {{ selectedEquipment.name }}</p>
        <p><strong>Modelo:</strong> {{ selectedEquipment.model?.name }}</p>
        <p><strong>Localização atual:</strong> {{ selectedEquipment.position.lat }}, {{ selectedEquipment.position.lng
            }}</p>
        <p><strong>status:</strong> {{ selectedEquipment.states.length > 0 ?
            selectedEquipment.states[selectedEquipment.states.length -
                1]?.name : 'Nenhum Status disponível' }}</p>
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