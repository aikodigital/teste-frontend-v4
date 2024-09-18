<template>
    <div>
        <div class="mb-4">
            <select v-model="selectedStatus"
                class="w-full p-2 rounded-md border border-gray-600 bg-gray-800 text-gray-100">
                <option value="">Todos os Status</option>
                <option v-for="status in uniqueStatuses" :key="status" :value="status">
                    {{ status }}
                </option>
            </select>
        </div>

        <div class="overflow-x-auto rounded-md">
            <table class="min-w-full bg-gray-700 border-separate border-spacing-0">
                <thead class="bg-blue-900 text-gray-100">
                    <tr>
                        <th class="py-2 px-2 text-left border-b border-gray-600 sm:text-center">Data</th>
                        <th class="py-2 px-2 text-left border-b border-gray-600 sm:text-center">Horário de Atualização
                        </th>
                        <th class="py-2 px-2 text-left border-b border-gray-600 sm:text-center">Status</th>
                        <th class="py-2 px-2 text-left border-b border-gray-600 sm:text-center">Horas no Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(state, index) in paginatedStates" :key="index" class="text-gray-100">
                        <td class="py-1 px-2 border-b border-gray-600 text-center text-sm">{{ formattedDate(state.date)
                            }}</td>
                        <td class="py-1 px-2 border-b border-gray-600 text-center">{{ formattedHours(state.date) }}</td>
                        <td class="py-1 px-2 border-b border-gray-600 text-center">{{ state.name }}</td>
                        <td class="py-1 px-2 border-b border-gray-600 text-center">{{ state.hours }} horas</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-4 flex justify-center items-center gap-4">
            <button :disabled="currentPage === 1" @click="currentPage--"
                class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                Anterior
            </button>
            <span class="text-gray-100">Página {{ currentPage }} de {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="currentPage++"
                class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                Próxima
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch } from 'vue';

interface StateWithHours {
    date: string;
    name: string;
    hours: number;
}

export default defineComponent({
    name: 'EquipmentHistoryTable',
    props: {
        stateHistoryWithHours: {
            type: Array as PropType<StateWithHours[]>,
            required: true
        },
        formattedDate: {
            type: Function as PropType<(date: string) => string>,
            required: true
        },
        formattedHours: {
            type: Function as PropType<(date: string) => string>,
            required: true
        }
    },
    setup(props) {
        const selectedStatus = ref<string>('');
        const currentPage = ref<number>(1);
        const itemsPerPage = 10;

        const uniqueStatuses = computed(() => {
            const statuses = props.stateHistoryWithHours.map(state => state.name);
            return [...new Set(statuses)];
        });

        const filteredStates = computed(() => {
            if (!selectedStatus.value) return props.stateHistoryWithHours;
            return props.stateHistoryWithHours.filter(state =>
                state.name === selectedStatus.value
            );
        });

        const totalPages = computed(() => {
            return Math.ceil(filteredStates.value.length / itemsPerPage);
        });

        const paginatedStates = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return filteredStates.value.slice(start, end);
        });

        watch(selectedStatus, () => {
            currentPage.value = 1;
        });

        return {
            selectedStatus,
            uniqueStatuses,
            filteredStates,
            paginatedStates,
            currentPage,
            totalPages
        };
    }
});
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 6px;
    border: 1px solid #444;
}

thead {
    background-color: #1e3a8a;
}

@media (max-width: 768px) {
    table {
        font-size: 0.875rem;
    }

    th,
    td {
        padding: 4px;
    }
}
</style>
