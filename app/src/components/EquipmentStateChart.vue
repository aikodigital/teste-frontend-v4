<template>
    <Pie :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue';
import { Pie } from 'vue-chartjs';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import type { TooltipItem, Chart as ChartJSChart } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const stateColorMap: Record<string, string> = {
    'Operando': '#2ecc71',
    'Manutenção': '#e74c3c',
    'Parado': '#f1c40f',
};

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
                            label: (context: TooltipItem<'pie'>) => {
                                const label = context.label || '';
                                const value = context.raw as number;
                                const total = (context.chart as ChartJSChart<'pie'>).data.datasets[0].data as number[];
                                const totalSum = total.reduce((a, b) => (typeof a === 'number' ? a : 0) + (typeof b === 'number' ? b : 0), 0);
                                const percentage = totalSum > 0 ? ((value / totalSum) * 100).toFixed(2) : '0.00';
                                return `${label}: ${value} (${percentage}%)`;
                            }
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
        const chartData = ref(props.chartData);

        const updateChartColors = () => {
            const dataset = chartData.value.datasets?.[0];
            if (dataset) {
                dataset.backgroundColor = dataset.data.map((_, index) => {
                    const label = chartData.value.labels?.[index] as string;
                    return stateColorMap[label] || '#cccccc';
                });
            }
        };

        watch(() => props.chartData, (newData) => {
            chartData.value = newData;
            updateChartColors();
        }, { deep: true });

        return {
            chartData,
            chartOptions: props.chartOptions
        };
    }
});
</script>
