<template>
    <Pie :data="chartData" :options="chartOptions" class="w-96 h-80" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Pie } from 'vue-chartjs';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import type { TooltipItem } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const colors = [
    '#f1c40f', // Parado
    '#e74c3c', // Manutenção
    '#2ecc71'  // Operando
];

export default defineComponent({
    name: 'EquipmentStateChart',
    components: { Pie },
    props: {
        chartData: {
            type: Object as PropType<ChartData<'pie'>>,
            required: true
        },
        chartOptions: {
            type: Object as PropType<ChartOptions<'pie'>>,
            default: () => ({
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context: TooltipItem<'pie'>) => `${context.label}: ${context.raw}`
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 1
                    }
                }
            })
        }
    },
    setup(props) {
        const updateChartColors = () => {
            const dataset = props.chartData.datasets?.[0];
            if (dataset) {
                dataset.backgroundColor = colors;
            }
        };

        updateChartColors();

        return {
            chartData: props.chartData,
            chartOptions: props.chartOptions
        };
    }
});
</script>