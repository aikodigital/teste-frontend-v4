<script lang="ts" setup>
// Stores
import { useEquipmentsStore } from '~/stores/equipments';

const useEquipments = useEquipmentsStore();

const { positionsByEquipmentId } = storeToRefs(useEquipments);

// Variables
const headers = [
	{ name: 'lat', label: 'Latitude' },
	{ name: 'lon', label: 'Longitude' },
	{ name: 'date', label: 'Data' },
];
</script>

<template>
	<BaseTable
		:headers
		:data="positionsByEquipmentId"
	>
		<template #date="{ row }">
			{{ $moment(row.date).format("DD/MM/YYYY HH:ss") }}
		</template>
	</BaseTable>
</template>
