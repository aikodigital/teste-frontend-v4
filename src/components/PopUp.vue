<template>
    <div class="popup-area">
        <div class="item-list">
            <span class="label">Equipamento:</span>
            <span class="data">{{ props.position?.equipmentName }}</span>
        </div>
        <div class="item-list">
            <span class="label">Modelo:</span>
            <span class="data">{{ props.position?.equipmentModelName }}</span>
        </div>
        <div class="item-list">
            <span class="label">Estado atual:</span>
            <span class="data">{{ props.position?.currentStateName }}</span>
        </div>
        <div class="item-list">
            <span class="label">Data da última posição: </span>
            <span class="data">{{ formatDate(props.position?.date) }}</span> 
        </div>
    </div>
</template>

<script setup lang="ts">
import { type LatestEquipmentInfo } from "@/types/types"

const props = defineProps({
    position: {
        type: {} as () => LatestEquipmentInfo,
        required: true,
    },
});

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
.popup-area {
    display: flex;
    flex-direction: column;
    height: 200px;
    width: fit-content;
}

.item-list {
    display: flex;
    margin: 10px 0;
}

.label {
    font-weight: bold;
}

.data {
    margin-left: 5px;
}
</style>