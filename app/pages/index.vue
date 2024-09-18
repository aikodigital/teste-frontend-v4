<template>
    <v-container fluid class="py-5">
        <!-- Cabeçalho com o título e logo da empresa -->
        <v-row>
            <v-col cols="12" class="d-flex align-center justify-space-between">
                <v-card-title class="text-h4 font-weight-bold text-primary">Mapa de Equipamentos</v-card-title>
                <img src="/aiko.png" alt="Logo da Empresa" class="company-logo mr-3" height="60px" />
            </v-col>
            <v-card-subtitle class="mb-4 text-subtitle-1">
                Visualize os equipamentos e acompanhe o histórico de movimentação de forma interativa.
            </v-card-subtitle>
        </v-row>

        <!-- Filtros -->
        <v-row class="mb-6">
            <v-col cols="12">
                <v-card class="pa-4" elevation="4" color="#f0f4f8" dark>
                    <v-row>
                        <!-- Tipo de Equipamento -->
                        <v-col cols="12" md="3">
                            <v-select v-model="filterType" label="Tipo de Equipamento" :items="equipmentModel" clearable
                                variant="outlined" item-value="id" item-title="name" @keyup.enter="applyFilters" />
                        </v-col>

                        <!-- Status -->
                        <v-col cols="12" md="3">
                            <v-select v-model="filterStatus" label="Status" :items="equipmentState" clearable
                                variant="outlined" item-value="id" item-title="name" @keyup.enter="applyFilters" />
                        </v-col>

                        <!-- Nome ou ID do Equipamento -->
                        <v-col cols="12" md="3">
                            <v-text-field v-model="filterEquipmentName" label="Nome ou ID do Equipamento" clearable
                                variant="outlined" @keyup.enter="applyFilters" />
                        </v-col>

                        <!-- Botões de Ação -->
                        <v-col cols="12" md="3" class="d-flex align-center justify-end">
                            <v-btn color="red darken-2" class="mr-2" @click="clearFilters" size="large" elevation="3"
                                :rounded="true">Limpar</v-btn>
                            <v-btn color="green darken-2" @click="applyFilters" size="large" elevation="3"
                                :rounded="true">Filtrar</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <!-- Instrução e Mapa -->
        <v-row class="mt-n5">
            <v-col cols="12">
                <v-card-subtitle class="mb-3 text-subtitle-1 text-secondary">
                    Selecione um equipamento no mapa para ver o histórico de movimentação detalhado.
                </v-card-subtitle>
            </v-col>
        </v-row>

        <!-- Mapa -->
        <v-row>
            <v-col cols="12">
                <v-card class="map-card" elevation="6">
                    <div id="map" ref="mapElement" class="map-container"></div>
                </v-card>
            </v-col>
        </v-row>

        <!-- Detalhes do Equipamento -->
        <DetailsEquipament v-model:dialog="show" :equipament="selectedEquipment" @close="closeModal" />

        <!-- Menu do Equipamento -->
        <Menu v-model:menu="menu" :menuX="menuX" :menuY="menuY" :selectedEquipment="selectedEquipment"
            :selectedEquipmentHistory="selectedEquipmentHistory" />
    </v-container>
</template>

<script setup>
import L from 'leaflet'
import { getEquipments } from '~/services/index.ts'
import DetailsEquipament from '../components/DetailsEquipament.vue';

const show = ref(false)
const menu = ref(false)
const menuX = ref(0)
const menuY = ref(0)

const mapElement = ref(null)
const selectedEquipment = ref(null)
const selectedEquipmentHistory = ref([])

const { equipments, equipmentPositions, equipmentStateHistory, equipmentState, equipmentModel } = await getEquipments()

const filterType = ref(null)
const filterStatus = ref(null)
const filterEquipmentName = ref(null)

const brasil = [-15.783471, -47.917953]
const maxBounds = [[-57.23088423533873, -124.27734375000001], [17.069033944389506, -1.1425781250000002]]

let map = null

const setMapSettings = async (positions) => {
    try {
        if (!map) {
            map = L.map(mapElement.value).setView(brasil, 1);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            map.setMaxBounds(maxBounds);
            map.on('drag', function () {
                map.panInsideBounds(maxBounds, { animate: true });
            });


            L.icon({
                iconSize: [48, 40],
                iconUrl: 'tipos_equipamentos/Caminhão de carga.png',
            })

        } else {
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
        }

        const markerBounds = []
        positions.forEach(item => {
            const orderedPositions = item.positions.sort((a, b) => new Date(b.date) - new Date(a.date))
            const lastPosition = orderedPositions[0]

            const equipment = equipments.find(e => e.id === item.equipmentId)

            const getModel = equipmentModel.find(e => e.id === equipment.equipmentModelId)

            const icon = L.icon({
                iconSize: [48, 40],
                iconUrl: `tipos_equipamentos/${getModel.name}.png`,
            })

            const marker = L.marker([lastPosition.lat, lastPosition.lon], { icon })
                .addTo(map)
                .on('click', async () => {
                    show.value = true
                })

            marker.on('mouseover', async (event) => {
                await getHistoryEquipament(item.equipmentId)

                const { latlng } = event;
                const point = map.latLngToContainerPoint(latlng);

                menuX.value = point.x;
                menuY.value = point.y;

                menu.value = true;
            });

            marker.on('mouseout', () => {
                menu.value = false;
            });

            markerBounds.push([lastPosition.lat, lastPosition.lon])


        })

        if (markerBounds.length) map.fitBounds(markerBounds)

    } catch (error) {
        console.error('Erro ao configurar o mapa', error)
    }
}

function closeModal() {
    show.value = false
}

function clearFilters() {
    filterType.value = null
    filterStatus.value = null
    filterEquipmentName.value = null;
    setMapSettings(equipmentPositions)
}

function getStateName(stateId) {
    const state = equipmentState.find(s => s.id === stateId)
    return state ? state.name : 'Desconhecido'
}

async function getHistoryEquipament(stateId) {
    try {
        const history = equipmentStateHistory.filter(e => e.equipmentId === stateId);

        const lastHistory = history.map(h => {

            const sortedStates = h.states.sort((a, b) => new Date(b.date) - new Date(a.date));

            return {
                date: sortedStates[0].date,
                dateFormatted: new Date(sortedStates[0].date).toLocaleString(),
                stateId: sortedStates[0].equipmentStateId,
                stateName: getStateName(sortedStates[0].equipmentStateId),
                color: equipmentState.find(s => s.id === sortedStates[0].equipmentStateId).color
            };
        });

        selectedEquipment.value = {
            ...equipments.find(e => e.id === stateId),
            ...lastHistory[0],
            history: formattedHistory(history[0].states)
        };

        selectedEquipmentHistory.value = lastHistory;

    } catch (error) {
        console.error('Erro ao buscar histórico do equipamento:', error);
    }
}

function formattedHistory(history) {
    return history.map(h => {
        return {
            date: h.date,
            dateFormatted: new Date(h.date).toLocaleString(),
            stateId: h.equipmentStateId,
            stateName: getStateName(h.equipmentStateId),
            color: equipmentState.find(s => s.id === h.equipmentStateId).color
        };
    });
}

function applyFilters() {
    let filteredEquipments = equipments;

    if (filterType.value) {
        const typeEquipment = equipmentModel.find(e => e.id === filterType.value);
        if (typeEquipment) {
            filteredEquipments = filteredEquipments.filter(e => e.equipmentModelId === typeEquipment.id);
        } else {
            console.warn('Nenhum modelo de equipamento correspondente encontrado.');
            return;
        }
    }

    if (filterStatus.value) {
        filteredEquipments = filteredEquipments.filter(e => {
            const equipmentHistory = equipmentStateHistory.find(eq => eq.equipmentId === e.id);
            if (!equipmentHistory) return false;

            const latestState = equipmentHistory.states.reduce((latest, state) => new Date(state.date) > new Date(latest.date) ? state : latest);

            return latestState.equipmentStateId === filterStatus.value;
        });
    }

    if (filterEquipmentName.value) {
        const searchTerm = filterEquipmentName.value.toLowerCase();
        filteredEquipments = filteredEquipments.filter(e => e.name.toLowerCase().includes(searchTerm) || e.id.toLowerCase().includes(searchTerm));
    }

    const equipmentPositionsFiltered = equipmentPositions.filter(e => filteredEquipments.some(eq => eq.id === e.equipmentId));

    setMapSettings(equipmentPositionsFiltered);
}

onMounted(async () => { await setMapSettings(equipmentPositions) })

</script>

<style scoped>
.company-logo {
    border-radius: 8px;
}

.map-card {
    height: 60vh;
    width: 100%;
    border-radius: 16px;
    background-color: #f4f6f9;
}

.map-container {
    height: 100%;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
}

.text-primary {
    color: #1565c0;
}

.text-secondary {
    color: #757575;
}
</style>
