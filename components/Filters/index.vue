<script lang="ts" setup>
// Components
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

// Stores
import { useEquipmentsStore } from '~/stores/equipments';

const useEquipments = useEquipmentsStore();

const { models, filters, states } = storeToRefs(useEquipments);

// Variables
const openFilters = ref(false);
</script>

<template>
	<button
		aria-label="Filtros"
		class="grid place-items-center p-3 rounded-full bg-white cursor-pointer shadow outline-none"
		@click="openFilters = !openFilters"
	>
		<Icon
			name="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"
			class="text-2xl"
		/>
	</button>
	<BaseSlideover
		v-model="openFilters"
		title="Filtros"
		subtitle="Visualize e gerêncie seus filtros."
	>
		<section class="flex flex-col gap-5">
			<!-- Filtro por módulos -->
			<label>
				<p class="font-semibold text-gray-700">Modelos</p>
				<Multiselect
					v-model="filters.models"
					:options="models.map((m) => m.name)"
					placeholder="Selecione os modelos que deseja filtrar"
					:multiple="true"
					:clear-on-select="false"
					:allow-empty="true"
				/>
			</label>
			<!-- Filtro por estado -->
			<label>
				<p class="font-semibold text-gray-700">Status</p>
				<Multiselect
					v-model="filters.states"
					:options="states.map((m) => m.name)"
					placeholder="Selecione os status que deseja filtrar"
					:multiple="true"
					:clear-on-select="false"
					:allow-empty="true"
				/>
			</label>
		</section>
	</BaseSlideover>
</template>
