import equipments from '../../data/equipment.json'
import equipmentModels from '@@/server/data/equipmentModel.json'
import { getRecentPosition, getRecentState } from '../../utils/equipmentUtils'

import type { Equipment } from '@@/types/equipment'

export default defineEventHandler<Equipment[]>(() => {
	try {
		const data = equipments.map(item => ({
			...item,
			equipmentModelName:
				equipmentModels.find(model => model.id === item.equipmentModelId)
					?.name || '',
			position: getRecentPosition(item.id),
			state: getRecentState(item.id),
		}))
		return data
	} catch (error) {
		console.error('Erro ao processar os equipamentos:', error)
		throw createError({ statusCode: 500, message: 'Erro interno do servidor' })
	}
})
