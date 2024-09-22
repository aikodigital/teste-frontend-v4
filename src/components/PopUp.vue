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
            <span class="label">Data:</span>
            <span class="data">{{ formatDate(props.position?.date) }}</span> 
        </div>
    </div>
</template>

<script setup lang="ts">
import { type LatestEquipmentInfo } from "@/types/types"
import { formatDate } from "@/utils/utils"

const props = defineProps({
    position: {
        type: {} as () => LatestEquipmentInfo,
        required: true,
    },
});
</script>

<style scoped>
.popup-area {
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: fit-content;
}

.item-list {
    display: flex;
    margin: 10px 0;
}

.label {
    font-weight: bold;
    font-size: 16px;
}

.data {
    margin-left: 5px;
    font-size: 16px;
}
</style>