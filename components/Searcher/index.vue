<script lang="ts" setup>
// Utils
import _ from 'lodash';

// Stores
import { useEquipmentsStore } from '~/stores/equipments';

const useEquipments = useEquipmentsStore();

// Variables
const nameToSearch = ref('');

// Functions
const handleInput = _.debounce(async () => {
	await useEquipments.filterEquipments({ name: nameToSearch.value });
}, 500);
</script>

<template>
	<section class="flex items-center gap-3 w-full h-fit bg-white shadow rounded-md px-3 py-2 max-w-[350px]">
		<Icon name="streamline:magnifying-glass" />
		<input
			v-model="nameToSearch"
			type="text"
			class="size-full outline-none"
			placeholder="Pesquise por equipamentos aqui..."
			@input="handleInput"
		>
	</section>
</template>
