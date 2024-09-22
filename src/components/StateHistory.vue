<template>
    <div class="history-area">
        <div class="close-area">
            <span class="close-btn" @click="close">X</span>
        </div>
        <h2>{{ stateHistoryStore.stateHistoryData.equipmentName }}</h2>
        <h3>{{ stateHistoryStore.stateHistoryData.equipmentModelName }}</h3>
        <h3 v-if="stateHistoryStore.stateHistoryData.lastState === 'Operando'">
            Produtividade de {{ stateHistoryStore.stateHistoryData.productivity?.toFixed(2) }}%
        </h3>
        <button @click="getPositionHistory()">Exibir histórico de posições</button>
        <div class="table-area">
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in sortedStates" :key="index">
                        <td v-if="item.date">{{ formatDate(item.date) }}</td>
                        <td v-if="item.equipmentStateName">
                            {{ item.equipmentStateName }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script script setup lang="ts">
import { computed } from "vue";
import { useStateHistoryStore } from "@/stores/stateHistory";
import { usePositionHistoryStore } from "@/stores/positionHistory";
import { formatDate } from "@/utils/utils"

const stateHistoryStore = useStateHistoryStore();
const positionHistoryStore = usePositionHistoryStore();

const sortedStates = computed(() => {
    const states = stateHistoryStore.stateHistoryData.states;
    
    if (states && Array.isArray(states)) {
        return [...states].sort((a, b) => {
            const dateA = new Date(a.date || 0);
            const dateB = new Date(b.date || 0);
            return dateB.getTime() - dateA.getTime();
        });
    }
    return [];
});

const close = () => {
    stateHistoryStore.setStateHistoryView(false);
    stateHistoryStore.resetStateHistoryData();
    positionHistoryStore.resetPositionHistoryData();
    positionHistoryStore.getLatestPositionsHistory();
};

const getPositionHistory = () => {
    const equipmentData = stateHistoryStore.stateHistoryData;
    positionHistoryStore.getPositionHistory(equipmentData);
}
</script>

<style scoped>
.history-area {
    height: 80vh;
    width: 26vw;
    background-color: var(--indigo-dark-blue);
    color: white;
    border-radius: 30px 0 0 30px;
    margin-left: 20px;
    padding: 10px 30px 30px 30px;
    box-shadow: 0 8px 6px -6px rgb(0, 0, 0);
}

.close-area {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.close-btn {
    cursor: pointer;
    font-weight: bold;
}

.table-area {
    max-height: 70%;
    margin-top: 15px;
    overflow: auto;
}

table {
    width: 100%;
}

th {
    background-color: var(--indigo-light-3-blue);
    position: sticky;
    top: 0;
    z-index: 10;
}

td {
    text-align: center;
}

tr:nth-child(even) {
    background-color: var(--indigo-light-1-blue);
}

tr:nth-child(odd) {
    background-color: var(--indigo-light-2-blue);
}

tr:hover {
    background-color: var(--light-gray-1);
    color: black;
}

button {
    background-color: var(--indigo-light-1-blue);
    color: white;
    cursor: pointer;
    margin-top: 10px;
    border: 0;
    padding: 3px;
}
</style>