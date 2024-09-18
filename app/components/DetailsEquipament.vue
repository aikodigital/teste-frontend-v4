<template>
    <v-dialog v-model="localDialog" max-width="800px" max-height="800px">
        <v-card>
            <v-card-text>
                <v-row class="mb-n10">
                    <v-col cols="6">
                        <v-text-field label="Nome" v-model="equipament.name" readonly variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="ID" v-model="equipament.id" readonly variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field label="Última Movimentação" v-model="equipament.dateFormatted" readonly variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="Status" v-model="equipament.stateName" readonly
                            variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card class="card-box">
                <div class="header-container">
                    <v-row justify="space-between" align="center">
                        <v-card-title>Histórico de Movimentação</v-card-title>
                        <v-card-title>({{ equipament.history.length }})</v-card-title>
                    </v-row>
                </div>
                <v-card-text class="scrollable-content">
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item-group>
                            <v-list-item v-for="state in equipament.history" :key="state.date">
                                <v-list-item-content class="d-flex justify-space-between">
                                    <v-list-item-title>
                                        {{ state.dateFormatted }}
                                    </v-list-item-title>
                                    <v-list-item-title>
                                        {{ state.stateName }}
                                        <v-icon :color="state.color" icon="mdi-circle" />
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-divider></v-divider>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
            </v-card>

            <v-card-actions>
                <v-btn color="red" @click="emit('close')">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">

import { computed } from 'vue';

interface Equipament {
    id: number;
    name: string;
    description: string;
    stateName: string;
    dateFormatted: string;
    history: Array<{
        color: string;
        date: string;
        stateName: string;
        dateFormatted: string;
    }>;
}

const props = defineProps({
    dialog: { type: Boolean, default: false },
    equipament: { type: Object as () => Equipament, default: null }
});

const emit = defineEmits(['update:dialog', 'close']);

const localDialog = computed({
    get: () => props.dialog,
    set: (value) => emit('update:dialog', value)
});

</script>
<style scoped>
.card-box {
    overflow-y: auto;
    margin: 20px;
    height: 500px;
    max-height: 600px;
    padding: 10px;
    border-radius: 8px;
}

.header-container {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
}

.scrollable-content {
    max-height: calc(100% - 50px);
    overflow-y: auto;
}

</style>
