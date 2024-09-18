<template>
    <div class="w-full h-auto text-white mt-10 mb-4">
        <h3 class="text-white font-semibold text-2xl uppercase mb-3">Métricas do equipamento</h3>
        <div class="flex gap-3 w-full">
            <div v-if="stateHistoryWithHours.length" class="bg-gray-400 bg-opacity-15 w-2/4 rounded-md p-4">
                <h4 class="text-2xl mb-4 font-bold">Dados de operação</h4>
                <p class="text-white font-medium">
                    <span class="font-semibold mr-3">
                        Horas Operando:
                    </span>
                    {{ hoursOperating }} horas
                </p>
                <p class="text-white mt-4 font-medium">
                    <span class="font-semibold mr-3">
                        Horas de Manutenção:
                    </span>
                    {{ hoursMaintenance }} horas
                </p>
                <p class="text-white mt-4 font-medium">
                    <span class="font-semibold mr-3">
                        Horas Parado:
                    </span>

                    {{ hoursIdle }} horas
                </p>
                <div class="text-white mt-4 font-medium">
                    <p>
                        <span class="font-semibold mr-3">
                            Valor p/ hora:
                        </span>
                        {{ formatedCurrency(operationalValue) }}
                    </p>
                </div>
                <div class="text-white mt-4 font-medium">
                    <p>
                        <span class="font-semibold mr-3">
                            Ganho Total:
                        </span>
                        {{ formatedCurrency(totalEarnings) }}
                    </p>
                </div>
            </div>
            <div class="w-2/4">
                <h4 class="text-2xl mb-4 font-bold">Percentual de operação</h4>

                <div class="size-96 mb-2 mx-auto">
                    <EquipmentStateChart :key="chartDataKey" :chartData="chartData" />
                </div>
            </div>
        </div>
        <h3 class="text-white font-semibold text-2xl uppercase mt-20 mb-3">Histórico do equipamento</h3>
        <div class="">
            <div class="flex w-full bg-blue-600 rounded-t-md border-s-2 border-s-transparent">
                <p class="py-4 w-1/4 text-center border-r-2 flex justify-center items-center">data</p>
                <p class="py-4 w-1/4 text-center  border-r-2 flex justify-center items-center">horário de atualização</p>
                <p class="py-4 w-1/4 text-center  border-r-2 flex justify-center items-center">status</p>
                <p class="py-4 w-1/4 text-center flex justify-center items-center">horas no estado</p>
            </div>
            <ul class="list-none text-white bg-gray-400 bg-opacity-15 w-full rounded-b-md border-s-2">
                <li v-for="(state, index) in stateHistoryWithHours" :key="index"
                    class="flex w-full justify-around border-b-2">
                    <p class="w-1/4 text-center p-2 font-medium border-r-2">{{ formatedDate(state.date) }}</p>
                    <p class="w-1/4 text-center p-2 font-medium border-r-2">{{ formatedHours(state.date) }}</p>
                    <p class="w-1/4 text-center p-2 font-medium border-r-2" >{{ state.name }}</p>
                    <p class="w-1/4 text-center p-2 font-medium border-r-2">{{ state.hours }} horas</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from 'vue';
import EquipmentStateChart from './EquipmentStateChart.vue';
import { EquipmentModel } from '../stores/equipmentStore';

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
        const formatedDate = (date: string) => {
            const fullDate = new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })

            return `${fullDate}`
        }
        const formatedHours = (date: string) => {
            const hour = new Date(date).getUTCHours()

            return `${hour}:00`
        }
        const formatedCurrency = (value: number | string) => {
            const format = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }
            const money = value.toLocaleString('pt-BR', format)
            return `${money}`
        }

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

        const operationalValue = props.model.hourlyEarnings[0].value;
        const maintenanceValue = props.model.hourlyEarnings[1].value;;
        const idleValue = props.model.hourlyEarnings[2].value;;

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
            chartDataKey,
            operationalValue,
            formatedDate,
            formatedCurrency,
            formatedHours
        };
    }
});
</script>
