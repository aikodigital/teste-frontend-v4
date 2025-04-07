<script setup lang="ts">
import { useEquipmentsStore } from '@/stores/equipments'

const equipmentsStore = useEquipmentsStore()
</script>

<template>
	<div
		class="h-screen w-xl flex flex-col items-center p-12 border-r border-gray-200 bg-white"
	>
		<MenuItemView v-if="equipmentsStore.itemViewId" />
		<MenuItemList v-else />
	</div>
</template>

<style></style>
