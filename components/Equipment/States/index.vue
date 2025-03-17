<script lang="ts" setup>
// Stores
import { useEquipmentsStore } from '~/stores/equipments';

const useEquipments = useEquipmentsStore();

const { statesHistoryByEquipmentId } = storeToRefs(useEquipments);

// Variables
const headers = [
	{ name: 'name', label: 'Estado' },
	{ name: 'date', label: 'Data' },
];
</script>

<template>
	<BaseTable
		:headers
		:data="statesHistoryByEquipmentId"
	>
		<template #name="{ row }">
			<p
				class="font-semibold"
				:style="{ color: row.color }"
			>
				{{ row.name }}
			</p>
		</template>
		<template #date="{ row }">
			{{ $moment(row.date).format("DD/MM/YYYY HH:ss") }}
		</template>
	</BaseTable>
</template>
