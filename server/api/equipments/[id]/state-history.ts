import equipmentsState from '../../../data/equipmentState.json'
import equipmentsStateHistory from '../../../data/equipmentStateHistory.json'

export default defineEventHandler(event => {
	try {
		const id = event.context.params?.id
		if (!id) {
			throw createError({
				statusCode: 400,
				message: 'ID do equipamento não fornecido',
			})
		}

		// Busca o histórico de estados do equipamento pelo ID
		const stateHistory = equipmentsStateHistory.find(
			history => history.equipmentId === id
		)

		if (!stateHistory) {
			throw createError({
				statusCode: 404,
				message: 'Histórico de estados não encontrado para o equipamento',
			})
		}

		// Mapeia os estados para incluir informações detalhadas
		const detailedHistory = stateHistory.states.map(state => {
			const stateDetails = equipmentsState.find(
				equipmentState => equipmentState.id === state.equipmentStateId
			)

			return {
				equipmentStateId: state.equipmentStateId,
				equipmentStateName: stateDetails?.name || 'Desconhecido',
				equipmentStateColor: stateDetails?.color || '#000000',
				createdAt: state.date,
			}
		})

		return detailedHistory
	} catch (error) {
		console.error('Erro ao buscar o histórico de estados:', error)
		throw createError({ statusCode: 500, message: 'Erro interno do servidor' })
	}
})
