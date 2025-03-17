<script lang="ts" setup>
// Stores
import { useEquipmentsStore } from '~/stores/equipments';

const useEquipments = useEquipmentsStore();

const { selectedEquipment } = storeToRefs(useEquipments);

// Computeds
const state_color = computed(() => selectedEquipment.value?.last_state?.type?.color);
</script>

<template>
	<span
		class="w-full px-2 py-3 border border-gray-700 rounded-full text-center font-semibold text-white"
		:style="{ backgroundColor: state_color, borderColor: state_color }"
	>
		{{ selectedEquipment?.last_state?.type?.name }}
	</span>
</template>
