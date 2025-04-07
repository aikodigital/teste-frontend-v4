<script setup lang="ts">
import type { Equipment } from '@@/types/equipment'

const equipmentsStore = useEquipmentsStore()

const { equipment } = defineProps<{
	equipment: Equipment
}>()

const icon = {
	'Caminhão de carga': 'i-mdi-truck',
	Harvester: 'i-mdi-truck',
	'9c3d009e-0d42-4a6e-9036-193e9bca3199': 'i-mdi-truck',
}
</script>

<template>
	<LMarker :lat-lng="[equipment.position.lat, equipment.position.lon]">
		<LIcon class-name="" :icon-size="[56, 56]">
			<div
				class="bg-primary-900 size-full text-white flex flex-col gap-1 items-center justify-center rounded-md"
			>
				<ModelIcon :id="equipment.equipmentModelId" class="size-8" />

				<h2 class="text-xs font-bold text-center">
					{{ equipment.name }}
				</h2>
			</div>
		</LIcon>
		<LPopup>
			<div class="flex flex-col items-center justify-center">
				<UIcon name="i-mdi-truck" class="size-12" />
				<h2 class="text-lg font-bold text-center">
					{{ equipment.equipmentModelName }}
				</h2>
				<h3 class="text- text-center">
					{{ equipment.name }}
				</h3>

				<h4
					class="mt-3 py-1 px-2 rounded-full text-white text-xs"
					:style="{ backgroundColor: equipment.state.equipmentStateColor }"
				>
					{{ equipment.state.equipmentStateName }}
				</h4>

				<UButton
					class="mt-5"
					variant="subtle"
					block
					@click="() => equipmentsStore.selectEquipment(equipment.id)"
				>
					Ver detalhes
				</UButton>
			</div>
		</LPopup>
	</LMarker>
</template>

<style></style>
