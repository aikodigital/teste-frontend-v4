<script setup lang="ts">
import { useEquipmentsStore } from '@/stores/equipments'

const equipmentsStore = useEquipmentsStore()

const { data: equipment, error } = useAsyncData('equipment', () => {
	return $fetch(`/api/equipments/${equipmentsStore.itemViewId}`)
})

const { data: stateHistory } = useAsyncData('stateHistory', () => {
	return $fetch(`/api/equipments/${equipmentsStore.itemViewId}/state-history`)
})

function formatDate(date: string) {
	return new Date(date).toLocaleDateString('pt-BR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	})
}

function calculateProductivity(): string {
	if (!stateHistory.value || stateHistory.value.length === 0) {
		return '0%'
	}

	let totalOperationalTime = 0
	let totalTime = 0

	for (let i = 0; i < stateHistory.value.length - 1; i++) {
		const currentState = stateHistory.value[i]
		const nextState = stateHistory.value[i + 1]

		if (!currentState || !nextState) continue

		const currentTime = new Date(currentState.createdAt ?? 0).getTime()
		const nextTime = new Date(nextState.createdAt ?? 0).getTime()

		totalTime += nextTime - currentTime

		if (currentState.equipmentStateName === 'Operando') {
			totalOperationalTime += nextTime - currentTime
		}
	}

	if (totalTime === 0) return '0%'

	const productivity = (totalOperationalTime / totalTime) * 100
	return `${productivity.toFixed(2)}%`
}

function calculateEarnings(): string {
	if (
		!stateHistory.value ||
		stateHistory.value.length === 0 ||
		!equipment.value ||
		!equipment.value.hourlyEarnings
	) {
		return 'R$ 0,00'
	}

	const hourlyRates = Object.fromEntries(
		equipment.value.hourlyEarnings.map(hourlyEarning => [
			hourlyEarning.equipmentStateId,
			{
				value: hourlyEarning.value,
				time: 0,
			},
		])
	)

	for (let i = 0; i < stateHistory.value.length - 1; i++) {
		const currentState = stateHistory.value[i]
		const nextState = stateHistory.value[i + 1]

		if (!currentState || !nextState) continue

		const currentTime = new Date(currentState.createdAt ?? 0).getTime()
		const nextTime = new Date(nextState.createdAt ?? 0).getTime()

		const elapsedTime = nextTime - currentTime

		if (hourlyRates[currentState.equipmentStateId]) {
			hourlyRates[currentState.equipmentStateId]!.time += elapsedTime
		}
	}

	let totalEarnings = 0

	for (const stateId in hourlyRates) {
		const rate = hourlyRates[stateId]!
		const hours = rate.time / (1000 * 60 * 60)

		totalEarnings += hours * rate.value
	}

	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(totalEarnings)
}

watch(error, newError => {
	if (newError) {
		equipmentsStore.selectEquipment()
	}
})
</script>

<template>
	<div class="w-full">
		<UButton
			class="mb-4"
			variant="subtle"
			size="xl"
			icon="i-mdi-arrow-left"
			icon-position="left"
			@click="equipmentsStore.selectEquipment()"
		>
			Voltar
		</UButton>
	</div>

	<template v-if="equipment">
		<ModelIcon :id="equipment.equipmentModelId" class="size-16" />
		<h2 class="text-xl font-bold text-center">
			{{ equipment.equipmentModelName }}
		</h2>
		<h3 class="text-lg text-center text-gray-500">
			{{ equipment.name }}
		</h3>

		<h4
			class="mt-4 py-1 px-2 rounded-full text-white text-md"
			:style="{ backgroundColor: equipment.state.equipmentStateColor }"
		>
			{{ equipment.state.equipmentStateName }}
		</h4>

		<div class="flex justify-around mt-8 mb-4 w-full">
			<div class="flex flex-col items-center justify-center">
				<h2 class="text-2xl font-bold">{{ calculateProductivity() }}</h2>
				<p class="text-gray-500">Produtividade</p>
			</div>
			<div class="flex flex-col items-center justify-center">
				<h2 class="text-2xl font-bold">{{ calculateEarnings() }}</h2>
				<p>Valor gerado</p>
			</div>
		</div>

		<h2 class="text-lg font-medium text-center mt-8 mb-2">
			Histórico de Estados
		</h2>

		<div class="p-2 flex-1 w-full overflow-auto flex flex-col gap-4">
			<UCard v-for="(state, index) in stateHistory" :key="index">
				<div class="flex justify-between items-center w-full">
					<h3 class="text-sm text-gray-500">
						{{ formatDate(state.createdAt) }}
					</h3>
					<h3
						class="py-1 px-2 rounded-full text-white text-sm"
						:style="{ backgroundColor: state.equipmentStateColor }"
					>
						{{ state.equipmentStateName }}
					</h3>
				</div>
			</UCard>
		</div>
	</template>
</template>

<style></style>
