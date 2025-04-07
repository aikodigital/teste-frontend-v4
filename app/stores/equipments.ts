import { defineStore } from 'pinia'

export const useEquipmentsStore = defineStore('equipments', () => {
	const filter = reactive<{
		name: string
		state: string[]
		model: string[]
	}>({
		name: '',
		state: [],
		model: [],
	})

	const itemViewId = ref<string>()

	const { data: allEquipments } = useAsyncData('equipments', () =>
		$fetch('/api/equipments')
	)

	const filteredEquipments = computed(() => {
		if (!allEquipments.value) return []

		return allEquipments.value.filter(equipment => {
			const nameMatch =
				equipment.equipmentModelName
					.toLowerCase()
					.includes(filter.name.toLowerCase()) ||
				equipment.name.toLowerCase().includes(filter.name.toLowerCase())

			const stateMatch = filter.state.length
				? filter.state.includes(equipment.state.equipmentStateId)
				: true

			const modelMatch = filter.model.length
				? filter.model.includes(equipment.equipmentModelId)
				: true
			return nameMatch && stateMatch && modelMatch
		})
	})

	function selectEquipment(id?: string) {
		if (id === itemViewId.value) return

		if (!id) {
			itemViewId.value = undefined
			return
		}

		const selectedEquipment = allEquipments.value?.find(
			equipment => equipment.id === id
		)

		if (selectedEquipment) {
			itemViewId.value = selectedEquipment.id
		}
	}

	return {
		equipments: filteredEquipments,
		filter,
		allEquipments,
		itemViewId: readonly(itemViewId),
		selectEquipment,
	}
})
