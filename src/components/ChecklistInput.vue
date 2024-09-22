<template>
    <div class="checklist-input">
        <h2>Filtros</h2>

        <h3>Estados:</h3>
        <div class="list-item" v-for="(state, index) in apiStore.equipmentState.map(m => m.name)" :key="index">
            <input id="state" type="checkbox" @change="handleSelect(state)"
                :checked="selectedFilters.includes(state)">
            <label for="state">{{ state }}</label>
        </div>

        <h3>Modelos:</h3>
        <div class="list-item" v-for="(model, index) in apiStore.equipmentsModel.map(m => m.name)" :key="index">
            <input id="model" type="checkbox" @change="handleSelect(model)"
                :checked="selectedFilters.includes(model)">
            <label for="model">{{ model }}</label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useApiStore } from "@/stores/api";
import { ref, onMounted } from "vue";

const apiStore = useApiStore();
const selectedFilters = ref<string[]>([]);

const emit = defineEmits(['updateFilter']);

const handleSelect = (item: string) => {
    const index = selectedFilters.value.indexOf(item);

    if (index !== -1) {
        selectedFilters.value.splice(index, 1);
    } else {
        selectedFilters.value.push(item);
    }

    emit('updateFilter', selectedFilters.value);
}

onMounted(async () => {
    await apiStore.fetchState();
    await apiStore.fetchEquipmentsModel();
});

</script>

<style scoped>
.checklist-input {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 50px;

    background-color: var(--indigo-dark-blue);
    color: white;
    border-radius: 0 30px 30px 0;
    margin-right: 20px;
    padding: 25px;
    box-shadow: 0 8px 6px -6px rgb(0, 0, 0);
}

h3 {
    margin-top: 20px;
}

.list-item {
    margin: 15px 0;
}

label {
    margin-left: 10px;
}
</style>