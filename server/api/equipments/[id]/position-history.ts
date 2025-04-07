import equipmentsPositionHistory from '../../../data/equipmentPositionHistory.json'

export default defineEventHandler(event => {
	try {
		const id = event.context.params?.id
		if (!id) {
			throw createError({
				statusCode: 400,
				message: 'ID do equipamento não fornecido',
			})
		}

		// Busca o histórico de posições do equipamento pelo ID
		const positionHistory = equipmentsPositionHistory.find(
			history => history.equipmentId === id
		)

		if (!positionHistory) {
			throw createError({
				statusCode: 404,
				message: 'Histórico de posições não encontrado para o equipamento',
			})
		}

		// Retorna o histórico de posições
		return positionHistory.positions.map(position => ({
			lat: position.lat,
			lon: position.lon,
			createdAt: position.date,
		}))
	} catch (error) {
		console.error('Erro ao buscar o histórico de posições:', error)
		throw createError({ statusCode: 500, message: 'Erro interno do servidor' })
	}
})
