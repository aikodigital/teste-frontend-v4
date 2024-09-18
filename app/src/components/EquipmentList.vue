<template>
    <div class="relative">
        <button @click="toggleMenu" class="lg:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>

        <div v-show="isMenuOpen && isMobile" @click="toggleMenu" class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

        <div :class="[
            'transform top-0 left-0 fixed h-full z-50 w-4/5 sm:w-3/4 md:w-2/4 lg:w-1/4 lg:translate-x-0 bg-gray-800 text-white p-4 transition-transform',
            isMenuOpen ? 'translate-x-0' : '-translate-x-full w-0 overflow-hidden',
        ]">
            <img src="../../public/images/aiko.png" alt="Aiko logo" class="mx-auto w-40 py-4" />
            <div class="border-t-2 border-gray-600 pt-2">
                <h2 class="text-2xl font-semibold mb-4">Filtros</h2>
                <div class="mb-4">
                    <label for="stateFilter" class="block text-sm font-medium">Filtrar por Estado:</label>
                    <select id="stateFilter" v-model="selectedStateFilter"
                        class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm bg-gray-900 text-white focus:outline-none sm:text-sm">
                        <option value="">Todos</option>
                        <option v-for="state in states" :key="state.id" :value="state.name">
                            {{ state.name }}
                        </option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="modelFilter" class="block text-sm font-medium">Filtrar por Modelo:</label>
                    <select id="modelFilter" v-model="selectedModelFilter"
                        class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm bg-gray-900 text-white focus:outline-none sm:text-sm">
                        <option value="">Todos</option>
                        <option v-for="model in models" :key="model.id" :value="model.name">
                            {{ model.name }}
                        </option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="search" class="block text-sm font-medium">Pesquisar:</label>
                    <input id="search" v-model="searchQuery" type="text" placeholder="Digite o nome do equipamento"
                        class="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-sm bg-gray-900 text-white focus:outline-none sm:text-sm" />
                </div>

                <div class="mb-4">
                    <button @click="clearFilters"
                        class="mt-4 text-white bg-green-500 font-bold mb-2 rounded-lg p-2 px-4 hover:bg-green-700 focus:outline-none transition-colors">
                        Limpar Filtros
                    </button>
                </div>
            </div>

            <div class="border-t-2 border-gray-600 pt-2">
                <h2 class="text-2xl font-semibold mb-4">Equipamentos</h2>
                <ul class="list-none text-gray-300 p-0 overflow-y-auto overflow-x-hidden max-h-96">
                    <li @click="selectEquipment(equipment)" v-for="equipment in filteredEquipments" :key="equipment.id"
                        :class="selectedEquipment?.name === equipment.name && 'bg-gray-700 translate-x-2'"
                        class="flex items-center cursor-pointer mb-1 hover:bg-gray-900 rounded-sm p-4 transition duration-200 ease-in-out">
                        <span class="flex-1 font-semibold">{{ equipment.name }}</span>
                        <span :style="{ color: getLastStateColor(equipment) }" class="status ml-3 text-sm font-medium">
                            <div class="indicator" :style="{ backgroundColor: getLastStateColor(equipment) }"></div>
                            {{ getLastStateName(equipment) || 'Nenhum Status disponível' }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import { Equipment, EquipmentModel, EquipmentState } from '../stores/equipmentStore';

export default defineComponent({
    props: {
        equipments: {
            type: Array as PropType<Equipment[]>,
            required: true,
        },
        selectedEquipment: {
            type: Object as PropType<Equipment | null>,
            required: false,
        },
        handleEquipmentClick: {
            type: Function as PropType<(equipment: Equipment) => void>,
            required: true,
        },
        states: {
            type: Array as PropType<EquipmentState[]>,
            required: true,
        },
        models: {
            type: Array as PropType<EquipmentModel[]>,
            required: true,
        },
    },
    setup(props) {
        const searchQuery = ref('');
        const selectedStateFilter = ref('');
        const selectedModelFilter = ref('');
        const isMenuOpen = ref(false);

        const isMobile = computed(() => window.innerWidth < 1024);

        const filteredEquipments = computed(() => {
            return props.equipments.filter((equipment) => {
                return matchesSearch(equipment) && matchesState(equipment) && matchesModel(equipment);
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

        const toggleMenu = () => {
            isMenuOpen.value = !isMenuOpen.value;
        };

        const selectEquipment = (equipment: Equipment) => {
            props.handleEquipmentClick(equipment);
            toggleMenu();
        };

        const getLastStateName = (equipment: Equipment) => {
            return equipment.states.length > 0
                ? equipment.states[equipment.states.length - 1]?.name
                : '';
        };

        const getLastStateColor = (equipment: Equipment) => {
            return equipment.states.length > 0
                ? equipment.states[equipment.states.length - 1]?.color
                : '#fff';
        };

        return {
            searchQuery,
            selectedStateFilter,
            selectedModelFilter,
            filteredEquipments,
            clearFilters,
            getLastStateName,
            getLastStateColor,
            toggleMenu,
            isMenuOpen,
            isMobile,
            selectEquipment,
        };
    },
});
</script>

<style scoped>
.status {
    display: flex;
    align-items: center;
    gap: 5px;
}

.status .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
</style>
