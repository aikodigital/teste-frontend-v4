<script lang="ts" setup>
const currentTab = ref('Positions');
const tabs = [
	{
		name: 'Positions',
		label: 'Histórico de posições',
	},
	{
		name: 'States',
		label: 'Histórico de estados',
	},
];
</script>

<template>
	<section class="flex flex-col gap-10">
		<EquipmentState />
		<BaseTabs
			v-model="currentTab"
			:tabs
		>
			<template #Positions>
				<EquipmentPositions />
			</template>
			<template #States>
				<EquipmentStates />
			</template>
		</BaseTabs>
	</section>
</template>
