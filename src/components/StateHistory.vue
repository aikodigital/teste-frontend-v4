<template>
    <div class="history-area">
        <div class="close-area">
            <span class="close-btn" @click="close">X</span>
        </div>
        <h2>{{ stateHistoryStore.stateHistoryData.equipmentName }}</h2>
        <h3>{{ stateHistoryStore.stateHistoryData.equipmentModelName }}</h3>
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

const stateHistoryStore = useStateHistoryStore();

const sortedStates = computed(() => {
    return [...stateHistoryStore.stateHistoryData.states].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    });
});

const close = () => {
    stateHistoryStore.setStateHistoryView(false);
    stateHistoryStore.resetStateHistoryData();
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
};
</script>

<style scoped>
.history-area {
    height: 80vh;
    width: 30vw;
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
    max-height: 80%;
    margin-top: 30px;
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
</style>