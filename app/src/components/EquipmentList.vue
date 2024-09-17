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
            <input id="search" v-model="searchQuery" type="text" placeholder="Digite o nome do equipamento" class="ml-2" />
        </div>

        <div class="mb-4">
            <button @click="clearFilters" class="px-4 py-2 bg-gray-600 text-white rounded">
                Limpar Filtros
            </button>
        </div>

        <ul class="list-disc pl-5 text-white">
            <li v-for="equipment in filteredEquipments" :key="equipment.id" class="cursor-pointer hover:underline" @click="handleEquipmentClick(equipment)">
                {{ equipment.name }}
                <span v-if="isSelectedEquipment(equipment)" :style="{ color: getLastStateColor(equipment) }">
                    <strong>Status:</strong>
                    {{ getLastStateName(equipment) || 'Nenhum Status disponível' }}
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
                return (
                    matchesSearch(equipment) &&
                    matchesState(equipment) &&
                    matchesModel(equipment)
                );
            });
        });

        const matchesSearch = (equipment: Equipment) => {
            return equipment.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        };

        const matchesState = (equipment: Equipment) => {
            if (!selectedStateFilter.value) return true;
            const lastState = equipment.states[equipment.states.length - 1];
            return lastState && lastState.name === selectedStateFilter.value;
        };

        const matchesModel = (equipment: Equipment) => {
            return selectedModelFilter.value
                ? equipment.model && equipment.model.name === selectedModelFilter.value
                : true;
        };

        const clearFilters = () => {
            searchQuery.value = '';
            selectedStateFilter.value = '';
            selectedModelFilter.value = '';
        };

        const getLastStateName = (equipment: Equipment) => {
            return equipment.states.length > 0 ? equipment.states[equipment.states.length - 1]?.name : '';
        };

        const getLastStateColor = (equipment: Equipment) => {
            return equipment.states.length > 0 ? equipment.states[equipment.states.length - 1]?.color : '#fff';
        };

        const isSelectedEquipment = (equipment: Equipment) => {
            return props.selectedEquipment && props.selectedEquipment.id === equipment.id;
        };

        return {
            searchQuery,
            selectedStateFilter,
            selectedModelFilter,
            filteredEquipments,
            clearFilters,
            getLastStateName,
            getLastStateColor,
            isSelectedEquipment
        };
    }
});
</script>
