<script setup lang="ts">
import { useEquipmentsStore } from '@/stores/equipments'

const equipmentsStore = useEquipmentsStore()

const { data: equipmentPositions, execute: fetchEquipmentPositions } =
	useAsyncData(
		'equipments',
		() => {
			return $fetch(
				`/api/equipments/${equipmentsStore.itemViewId}/position-history`
			)
		},
		{
			immediate: false,
		}
	)

watch(
	() => equipmentsStore.itemViewId,
	() => {
		if (equipmentsStore.itemViewId) {
			fetchEquipmentPositions()
		}
	}
)

function getMapCenter() {
	function calculateAveragePosition(positions: number[]) {
		return positions.reduce((a, b) => a + b, 0) / positions.length
	}

	if (equipmentPositions.value?.length) {
		const latitudes = equipmentPositions.value.map(position => position.lat)
		const longitudes = equipmentPositions.value.map(position => position.lon)

		const avgLat = calculateAveragePosition(latitudes)
		const avgLon = calculateAveragePosition(longitudes)

		return [avgLat, avgLon]
	} else if (equipmentsStore.equipments?.length) {
		const latitudes = equipmentsStore.equipments.map(
			({ position }) => position.lat
		)
		const longitudes = equipmentsStore.equipments.map(
			({ position }) => position.lon
		)

		const avgLat = calculateAveragePosition(latitudes)
		const avgLon = calculateAveragePosition(longitudes)

		return [avgLat, avgLon]
	}

	return [-19.135, -45.98]
}
</script>

<template>
	<LMap
		class="h-full w-full"
		:zoom="11"
		:center="getMapCenter()"
		:use-global-leaflet="false"
	>
		<LTileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
			layer-type="base"
			name="OpenStreetMap"
		/>

		<LPolyline
			v-if="equipmentsStore.itemViewId && equipmentPositions"
			:lat-lngs="[equipmentPositions.map(pos => [pos.lat, pos.lon])]"
			color="blue"
		/>
		<MapMarker
			v-for="equipment in equipmentsStore.equipments"
			v-else
			:key="equipment.id"
			:equipment="equipment"
		/>
	</LMap>
</template>

<style></style>
