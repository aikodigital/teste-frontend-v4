<template>
    <div class="w-full h-auto text-white mt-10 mb-4 lg:px-8">
        <div v-if="stateHistoryWithHours.length" class="mx-auto md:w-fit md:m-0">
            <h3 class="text-white font-semibold text-lg md:text-2xl uppercase mb-3">Métricas do Equipamento</h3>
            <div class="bg-gray-800 bg-opacity-50 rounded-lg p-4 sm:p-6 shadow-lg flex flex-col md:flex-row gap-6 ">
                <div class="justify-center flex flex-col items-center flex-1 space-y-4">
                    <p class="flex items-center">
                        <span class="font-semibold text-gray-300 mr-3">Horas Operando:</span>
                        <span class="text-gray-400">{{ hoursOperating }} horas</span>
                    </p>
                    <p class="flex items-center whitespace-nowrap">
                        <span class="font-semibold text-gray-300 mr-3">Horas de Manutenção:</span>
                        <span class="text-gray-400">{{ hoursMaintenance }} horas</span>
                    </p>
                    <p class="flex items-center">
                        <span class="font-semibold text-gray-300 mr-3">Horas Parado:</span>
                        <span class="text-gray-400">{{ hoursIdle }} horas</span>
                    </p>
                    <p class="flex items-center">
                        <span class="font-semibold text-gray-300 mr-3">Valor p/ Hora:</span>
                        <span class="text-gray-400">{{ formattedCurrency(operationalValue) }}</span>
                    </p>
                    <p class="flex items-center">
                        <span class="font-semibold text-gray-300 mr-3">Ganho Total:</span>
                        <span class="text-gray-400">{{ formattedCurrency(totalEarnings) }}</span>
                    </p>
                </div>
                <div class="w-full sm:w-96 mx-auto flex justify-center items-center">
                    <EquipmentStateChart :key="chartDataKey" :chartData="chartData" />
                </div>
            </div>
        </div>
        <h3 class="text-white font-semibold text-lg md:text-2xl uppercase mt-10 mb-3">Histórico do Equipamento</h3>
        <EquipmentHistoryTable :stateHistoryWithHours="stateHistoryWithHours" :formattedDate="formattedDate"
            :formattedHours="formattedHours" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from 'vue';
import EquipmentStateChart from './EquipmentStateChart.vue';
import { EquipmentModel } from '../stores/equipmentStore';
import EquipmentHistoryTable from '../components/EquipmentHistoryTable.vue';

interface State {
    date: string;
    name: string;
}

interface StateWithHours extends State {
    hours: number;
}

export default defineComponent({
    components: {
        EquipmentStateChart,
        EquipmentHistoryTable
    },
    props: {
        stateHistory: {
            type: Array as PropType<State[]>,
            required: true
        },
        model: {
            type: Object as PropType<EquipmentModel>,
            required: true
        }
    },
    setup(props) {
        const calculateHours = (stateHistory: State[]): StateWithHours[] => {
            const result: StateWithHours[] = [];
            for (let i = 0; i < stateHistory.length - 1; i++) {
                const currentState = stateHistory[i];
                const nextState = stateHistory[i + 1];
                const currentDate = new Date(currentState.date);
                const nextDate = new Date(nextState.date);
                const hours = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
                if (hours > 0) {
                    result.push({ ...currentState, hours });
                }
            }
            return result;
        };

        const formattedDate = (date: string) => {
            const fullDate = new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            return `${fullDate}`;
        };

        const formattedHours = (date: string) => {
            const hour = new Date(date).getUTCHours();
            return `${hour}:00`;
        };

        const formattedCurrency = (value: number | string) => {
            const format: Intl.NumberFormatOptions = {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL'
            };
            const money = Number(value).toLocaleString('pt-BR', format);
            return `${money}`;
        };

        const stateHistoryWithHours = computed(() => calculateHours(props.stateHistory));

        const hoursOperating = computed(() => {
            return stateHistoryWithHours.value
                .filter(state => state.name === 'Operando')
                .reduce((sum, state) => sum + state.hours, 0);
        });

        const hoursMaintenance = computed(() => {
            return stateHistoryWithHours.value
                .filter(state => state.name === 'Manutenção')
                .reduce((sum, state) => sum + state.hours, 0);
        });

        const hoursIdle = computed(() => {
            return stateHistoryWithHours.value
                .filter(state => state.name === 'Parado')
                .reduce((sum, state) => sum + state.hours, 0);
        });

        const operationalValue = computed(() => {
            return props.model.hourlyEarnings[0].value;
        });

        const maintenanceValue = computed(() => {
            return props.model.hourlyEarnings[1].value;
        });

        const idleValue = computed(() => {
            return props.model.hourlyEarnings[2].value;
        });

        const totalEarnings = computed(() => {
            return (
                (hoursOperating.value * operationalValue.value) +
                (hoursMaintenance.value * maintenanceValue.value) +
                (hoursIdle.value * idleValue.value)
            );
        });

        const chartData = computed(() => ({
            labels: ['Operando', 'Manutenção', 'Parado'],
            datasets: [
                {
                    label: 'Horas por Estado',
                    data: [hoursOperating.value, hoursMaintenance.value, hoursIdle.value],
                    backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f'],
                    hoverOffset: 4
                }
            ]
        }));

        const chartDataKey = ref(Date.now());

        watch(chartData, () => {
            chartDataKey.value = Date.now();
        });

        return {
            stateHistoryWithHours,
            hoursOperating,
            hoursMaintenance,
            hoursIdle,
            totalEarnings,
            chartData,
            chartDataKey,
            operationalValue,
            formattedDate,
            formattedCurrency,
            formattedHours
        };
    }
});
</script>
