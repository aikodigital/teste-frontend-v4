<template>
    <div id="map" class="map-container -z-10 fixed"></div>
    <DrawerDefault modal="true" style="width: 40rem;" :visible="isMenuOpen" position="right"
        header="Informação da máquina" :dismissable="true" :showCloseIcon="true" @update:visible="isMenuOpen = $event">
        <template #default>
            <div v-if="selectedEquipment">
                <div class="p-4 flex flex-row gap-4">
                    <p class="text-xl"><strong>Equipamento:</strong> {{ selectedEquipment.name }}</p>
                    <p class="text-xl">
                        <strong>Estado atual:</strong> {{ currentEquipmentState.name }}
                    </p>
                </div>

                <div class="card">
                    <Accordion value="0">
                        <AccordionPanel value="0">
                            <AccordionHeader>Histórico de posições</AccordionHeader>
                            <AccordionContent>
                                <p class="m-0">
                                <ul>
                                    <li v-for="pos in equipmentPositions" :key="pos.date">
                                        {{ new Date(pos.date).toLocaleString() }}: ({{ pos.lat }}, {{ pos.lon }})
                                    </li>
                                </ul>
                                <ul>
                                    <li v-for="pos in equipmentPositions" :key="pos.date">
                                        {{ new Date(pos.date).toLocaleString() }}: ({{ pos.lat }}, {{ pos.lon }})
                                    </li>
                                </ul>
                                </p>
                            </AccordionContent>
                        </AccordionPanel>
                        <AccordionPanel value="1">
                            <AccordionHeader>Histórico de estados</AccordionHeader>
                            <AccordionContent>
                                <p class="m-0">
                                <ul>
                                    <li v-for="state in equipmentStates" :key="state.date">
                                        {{ new Date(state.date).toLocaleString() }}:
                                        <span :style="{ color: state.stateColor }"><strong>{{ state.stateName
                                                }}</strong></span>
                                    </li>
                                </ul>
                                </p>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </div>
            </div>
        </template>
    </DrawerDefault>
</template>

<script>
import L from "leaflet";
import DrawerDefault from "../../components/Drawer/DrawerDefault.vue";
import { equipmentList, stateHistory, positionHostory, states } from '../../utils/data';


export default {
    components: {
        DrawerDefault
    },
    data() {
        return {
            isMenuOpen: false,
            selectedEquipment: null,
            currentEquipmentState: {},
            equipmentPositions: [],
            equipmentStates: []
        };
    },
    mounted() {
        this.initializeMap();
    },
    methods: {
        initializeMap() {
            const map = L.map("map").setView([-19.1982868, -46.0451483], 11);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            }).addTo(
                map
            );

            if (!equipmentList || equipmentList.length === 0) {
                return;
            }

            equipmentList.forEach((equipment) => {
                const equipmentPositions = this.getEquipmentPositions(equipment.id);
                const latestPosition =
                    equipmentPositions[equipmentPositions.length - 1];
                    
                const currentEquipmentState = this.getCurrentEquipmentState(
                    equipment.id
                );

                const marker = L.circleMarker([latestPosition.lat, latestPosition.lon], {
                    color: currentEquipmentState.color,
                })
                    .addTo(map)
                    .bindTooltip(`${equipment.name} - ${currentEquipmentState.name}`)
                    .on("click", () => this.showDrawer(equipment, latestPosition));
            });
        },
        getEquipmentPositions(equipmentId) {
            const history = positionHostory.find(
                (item) => item.equipmentId === equipmentId
            );
            return history ? history.positions : [];
        },
        getCurrentEquipmentState(equipmentId) {
            const history = stateHistory.find(
                (item) => item.equipmentId === equipmentId
            );
            const latestState = history.states[history.states.length - 1];

            return states.find((state) => state.id === latestState.equipmentStateId);
        },
        getEquipmentStates(equipmentId) {
            const history = stateHistory.find(
                (item) => item.equipmentId === equipmentId
            );

            if (!history) {
                return [];
            }

            return history.states.map((state) => {
                const equipmentState = states.find(
                    (s) => s.id === state.equipmentStateId
                );

                return {
                    date: state.date,
                    stateName: equipmentState ? equipmentState.name : "Desconhecido",
                    stateColor: equipmentState ? equipmentState.color : "#ccc",
                };
            });
        },
        showDrawer(equipment, latestPosition) {
            this.selectedEquipment = equipment;
            this.equipmentPositions = this.getEquipmentPositions(equipment.id);
            this.equipmentStates = this.getEquipmentStates(equipment.id);
            this.currentEquipmentState = this.getCurrentEquipmentState(equipment.id);
            this.isMenuOpen = true;
        }
    },
};
</script>

<style scoped>
.map-container {
    height: 100dvh;
    width: 100%;
}
</style>