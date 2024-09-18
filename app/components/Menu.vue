<template>
    <v-menu :model-value="menu" absolute width="300" height="200" :style="{ top: `${menuY + 150}px`, left: `${menuX + 20}px` }">
        <v-card>
            <v-card-title>{{ selectedEquipment?.name }}</v-card-title>
            <v-card-subtitle>
                <v-icon :color="selectedEquipmentHistory[0].color || '#fffff'">
                    mdi-circle
                </v-icon>
                -
                {{ selectedEquipmentHistory[0].stateName }}
            </v-card-subtitle>
            <v-divider class="mt-2 mb-2"></v-divider>
            <v-card-subtitle >
                Ultima atualização: {{ selectedEquipmentHistory[0].dateFormatted }}
            </v-card-subtitle>
            <v-divider class="mt-2 mb-2"></v-divider>
            <v-card-subtitle>
                Produtividade: {{ calculateProductivity(selectedEquipment?.id) }}%
            </v-card-subtitle>
            <v-card-subtitle>
                Ganho: R$ {{ calculateGain(selectedEquipment?.id) }}
            </v-card-subtitle>

        </v-card>
    </v-menu>
</template>

<script setup>

import { calculateGain, calculateProductivity } from '../composables/utils';

const props = defineProps({
    menu: { type: Boolean, default: false },
    menuX: { type: Number, default: 0 },
    menuY: { type: Number, default: 0 },
    selectedEquipment: { type: Object, default: null },
    selectedEquipmentHistory: { type: Array, default: [] },
});

</script>