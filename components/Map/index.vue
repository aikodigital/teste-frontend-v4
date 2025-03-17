<script lang="ts" setup>
// Core
import moment from 'moment';

// Types
import type { IEquipmentsWithMoreInfos } from '~/stores/equipments/equipments.schema';

// Stores
import { useEquipmentsStore } from '~/stores/equipments';

const useEquipments = useEquipmentsStore();

const { equipmentsWithMoreInfos, selectedEquipment }
  = storeToRefs(useEquipments);

// Variables
const detailsModalOpened = ref(false);

const equipment_icons: Record<string, Record<string, string>> = {
	'Caminhão de carga': {
		Operando: '/icons/truck_green.svg',
		Parado: '/icons/truck_yellow.svg',
		Manutenção: '/icons/truck_red.svg',
	},
	'Harvester': {
		Operando: '/icons/crane_green.svg',
		Parado: '/icons/crane_yellow.svg',
		Manutenção: '/icons/crane_red.svg',
	},
	'Garra traçadora': {
		Operando: '/icons/excavator_green.svg',
		Parado: '/icons/excavator_yellow.svg',
		Manutenção: '/icons/excavator_red.svg',
	},
};

// Functions
async function onMapReady() {
	await Promise.all([
		useEquipments.getStates(),
		useEquipments.getEquipments(),
		useEquipments.getEquipmentsModels(),
		useEquipments.getEquipmentStateHistory(),
		useEquipments.getEquipmentsPositionHistory(),
	]);
}

function openDetailsModal(equipment: IEquipmentsWithMoreInfos) {
	selectedEquipment.value = equipment;
	detailsModalOpened.value = true;
}

function closeDetailsModal() {
	selectedEquipment.value = null;
	detailsModalOpened.value = false;
}

function getEquipmentIcon(equipment: IEquipmentsWithMoreInfos) {
	return equipment_icons[equipment!.model!.name]?.[equipment.last_state.type.name];
};
</script>

<template>
	<LMap
		ref="map"
		class="size-full absolute top-0 left-0"
		:zoom="10"
		:center="[-19.126536, -45.947756]"
		:use-global-leaflet="false"
		:zoom-control="false"
		@ready="onMapReady"
	>
		<LTileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
			layer-type="base"
			name="OpenStreetMap"
		/>
		<!-- Controla o zoom -->
		<LControlZoom position="bottomright" />

		<!-- Renderiza os equipamentos no mapa -->
		<LMarker
			v-for="(equipment, index) in equipmentsWithMoreInfos"
			:key="index"
			:lat-lng="[equipment?.last_position?.lat, equipment?.last_position?.lon]"
			@click="openDetailsModal(equipment)"
		>
			<LIcon
				:icon-url="getEquipmentIcon(equipment)"
				:icon-size="[40, 40]"
			/>
			<LTooltip>
				<section class="flex flex-col">
					<p class="text-base text-gray-700 font-semibold mb-4 gap-2">
						{{ equipment.name }}
					</p>
					<p>
						Status: <strong :style="{ color: equipment.last_state.type.color }">{{ equipment.last_state.type.name }}</strong>
					</p>
					<p>Modelo: <strong>{{ equipment.model.name }}</strong></p>
					<p>Data: <strong>{{ moment(equipment.last_state.date).format("DD/MM/YYYY HH:mm") }}</strong></p>
				</section>
			</LTooltip>
		</LMarker>
	</LMap>
	<BaseSlideover
		v-model="detailsModalOpened"
		:title="`${selectedEquipment?.name || 'Equipamento'} | ${selectedEquipment?.model?.name}`"
		subtitle="Visualize o histórico e o trajeto percorrido pelo equipamento."
		@close="closeDetailsModal"
	>
		<EquipmentDetails />
	</BaseSlideover>
</template>
