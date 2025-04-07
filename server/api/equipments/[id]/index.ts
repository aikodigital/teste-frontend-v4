import equipments from '@@/server/data/equipment.json'
import equipmentModels from '@@/server/data/equipmentModel.json'
import {
	getRecentPosition,
	getRecentState,
} from '@@/server/utils/equipmentUtils'

import type { Equipment } from '@@/types/equipment'

export default defineEventHandler<Equipment | null>(event => {
	try {
		const id = event.context.params?.id
		if (!id) {
			throw createError({
				statusCode: 400,
				message: 'ID do equipamento não fornecido',
			})
		}

		const equipment = equipments.find(item => item.id === id)
		if (!equipment) {
			throw createError({
				statusCode: 404,
				message: 'Equipamento não encontrado',
			})
		}

		const equipmentModel = equipmentModels.find(
			model => model.id === equipment.equipmentModelId
		)

		if (!equipmentModel) {
			throw createError({
				statusCode: 404,
				message: 'Modelo do equipamento não encontrado',
			})
		}

		return {
			...equipment,
			equipmentModelName: equipmentModel.name,
			position: getRecentPosition(equipment.id),
			state: getRecentState(equipment.id),
			hourlyEarnings: equipmentModel.hourlyEarnings,
		}
	} catch (error) {
		console.error('Erro ao buscar o equipamento:', error)
		throw createError({ statusCode: 500, message: 'Erro interno do servidor' })
	}
})
