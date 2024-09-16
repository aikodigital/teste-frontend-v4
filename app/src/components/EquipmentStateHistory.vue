<template>
    <div>
        <h3 class="text-white mt-4">Histórico de Estados</h3>
        <div class="w-2/4 mb-2">
            <EquipmentStateChart :key="chartDataKey" :chartData="chartData" />
        </div>
        <div v-if="stateHistoryWithHours.length">
            <p class="text-white mt-4">Horas Operando: {{ hoursOperating.toFixed(2) }} horas</p>
            <p class="text-white mt-4">Horas de Manutenção: {{ hoursMaintenance.toFixed(2) }} horas</p>
            <p class="text-white mt-4">Horas Parado: {{ hoursIdle.toFixed(2) }} horas</p>
        </div>

        <div class="text-white mt-4">
            <p>Ganho Total: R$ {{ totalEarnings.toFixed(2) }}</p>
        </div>

        <ul class="list-disc pl-5 text-white">
            <li v-for="(state, index) in stateHistoryWithHours" :key="index">
                {{ state.date }} - {{ state.name }} ({{ state.hours.toFixed(2) }} horas)
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from 'vue';
import EquipmentStateChart from './EquipmentStateChart.vue';

interface State {
    date: string;
    name: string;
}

interface StateWithHours extends State {
    hours: number;
}

export default defineComponent({
    components: {
        EquipmentStateChart
    },
    props: {
        stateHistory: {
            type: Array as PropType<State[]>,
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

        const operationalValue = 100;
        const maintenanceValue = -20;
        const idleValue = -10;

        const totalEarnings = computed(() => {
            return (
                (hoursOperating.value * operationalValue) +
                (hoursMaintenance.value * maintenanceValue) +
                (hoursIdle.value * idleValue)
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
            chartDataKey
        };
    }
});
</script>
