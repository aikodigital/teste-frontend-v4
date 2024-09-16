<template>
    <div class="w-1/4 pr-1">
        <h2 class="text-white">Lista de Equipamentos</h2>
        <div class="mb-4">
            <label for="stateFilter" class="text-white">Filtrar por Estado:</label>
            <select id="stateFilter" v-model="selectedStateFilter" class="ml-2">
                <option value="">Todos</option>
                <option v-for="state in states" :key="state.id" :value="state.name">
                    {{ state.name }}
                </option>
            </select>
        </div>
        <div class="mb-4">
            <label for="modelFilter" class="text-white">Filtrar por Modelo:</label>
            <select id="modelFilter" v-model="selectedModelFilter" class="ml-2">
                <option value="">Todos</option>
                <option v-for="model in models" :key="model.id" :value="model.name">
                    {{ model.name }}
                </option>
            </select>
        </div>
        <div class="mb-4">
            <label for="search" class="text-white">Pesquisar:</label>
            <input id="search" v-model="searchQuery" type="text" placeholder="Digite o nome do equipamento"
                class="ml-2" />
        </div>
        <div class="mb-4">
            <button @click="clearFilters" class="px-4 py-2 bg-gray-600 text-white rounded">
                Limpar Filtros
            </button>
        </div>
        <ul class="list-disc pl-5 text-white">
            <li v-for="equipment in filteredEquipments" :key="equipment.id" class="cursor-pointer hover:underline"
                @click="handleEquipmentClick(equipment)">
                {{ equipment.name }}
                <span v-if="selectedEquipment && selectedEquipment.id === equipment.id"
                    :style="{ color: selectedEquipment.states[selectedEquipment.states.length - 1]?.color }">
                    <strong>Status:</strong>
                    {{ selectedEquipment.states.length > 0 ? selectedEquipment.states[selectedEquipment.states.length -
                        1]?.name : 'Nenhum Status disponível' }}
                </span>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue';
import { Equipment, EquipmentModel, EquipmentState } from '../stores/equipmentStore';

export default defineComponent({
    props: {
        equipments: {
            type: Array as PropType<Equipment[]>,
            required: true
        },
        selectedEquipment: {
            type: Object as PropType<Equipment | null>,
            required: false
        },
        handleEquipmentClick: {
            type: Function as PropType<(equipment: Equipment) => void>,
            required: true
        },
        states: {
            type: Array as PropType<EquipmentState[]>,
            required: true
        },
        models: {
            type: Array as PropType<EquipmentModel[]>,
            required: true
        }
    },
    setup(props) {
        const searchQuery = ref('');
        const selectedStateFilter = ref('');
        const selectedModelFilter = ref('');

        const filteredEquipments = computed(() => {
            return props.equipments.filter(equipment => {
                const matchesSearch = equipment.name.toLowerCase().includes(searchQuery.value.toLowerCase());

                const matchesState = selectedStateFilter.value
                    ? equipment.states.length > 0 && equipment.states[equipment.states.length - 1]?.name === selectedStateFilter.value
                    : true;

                const matchesModel = selectedModelFilter.value
                    ? equipment.model && equipment.model.name === selectedModelFilter.value
                    : true;

                return matchesSearch && matchesState && matchesModel;
            });
        });

        const clearFilters = () => {
            searchQuery.value = '';
            selectedStateFilter.value = '';
            selectedModelFilter.value = '';
        };

        return {
            searchQuery,
            selectedStateFilter,
            selectedModelFilter,
            filteredEquipments,
            clearFilters
        };
    }
});
</script>
