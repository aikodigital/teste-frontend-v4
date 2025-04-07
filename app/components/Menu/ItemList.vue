<script setup lang="ts">
import { useEquipmentsStore } from '@/stores/equipments'

const equipmentsStore = useEquipmentsStore()

const { data: stateOptions } = useAsyncData('stateOptions', () => {
	return $fetch('/api/states')
})

const { data: modelsOptions } = useAsyncData('modelsOptions', () => {
	return $fetch('/api/models')
})
</script>

<template>
	<div class="w-32 mb-12">
		<img src="~/assets/img/aiko.png" alt="Aiko Logo" />
	</div>

	<!-- <h2 class="text-2xl font-medium w-full mt-12 mb-6">Equipamentos</h2> -->
	<UInput
		v-model="equipmentsStore.filter.name"
		type="text"
		placeholder="Equipamento"
		class="mb-4 w-full"
		size="xl"
	/>

	<USelectMenu
		v-model="equipmentsStore.filter.state"
		:items="stateOptions"
		multiple
		value-key="id"
		label-key="name"
		class="mb-4 w-full"
		size="xl"
		placeholder="Estado Atual"
	/>

	<USelectMenu
		v-model="equipmentsStore.filter.model"
		:items="modelsOptions"
		multiple
		value-key="id"
		label-key="name"
		class="mb-4 w-full"
		size="xl"
		placeholder="Modelo"
	/>

	<h2 class="text-lg font-medium text-center mt-8 mb-2">Equipamentos</h2>
	<div class="flex-1 w-full overflow-auto flex flex-col gap-4 p-2">
		<div v-if="equipmentsStore.equipments.length === 0">
			<h2 class="text-center text-gray-500">Nenhum equipamento encontrado</h2>
		</div>

		<UCard
			v-for="equipment in equipmentsStore.equipments"
			:key="equipment.id"
			class="hover:bg-black/5 transition-colors duration-200 cursor-pointer"
			@click="equipmentsStore.selectEquipment(equipment.id)"
		>
			<div class="flex items-center gap-2">
				<div>
					<ModelIcon :id="equipment.equipmentModelId" class="size-8" />
				</div>
				<div>
					<h2>
						{{ equipment.equipmentModelName }}
					</h2>
					<h3 class="text-sm text-gray-500">
						{{ equipment.name }}
					</h3>
				</div>
				<div class="ml-auto">
					<h4
						class="py-1 px-2 rounded-full text-white text-xs"
						:style="{ backgroundColor: equipment.state.equipmentStateColor }"
					>
						{{ equipment.state.equipmentStateName }}
					</h4>
				</div>
			</div>
		</UCard>
	</div>
</template>
