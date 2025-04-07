import equipmentsModel from '../data/equipmentModel.json'
import equipmentsState from '../data/equipmentState.json'
import equipmentsStateHistory from '../data/equipmentStateHistory.json'
import equipmentsPositionHistory from '../data/equipmentPositionHistory.json'

export function getRecentPosition(equipmentId: string) {
	const equipmentPosition = equipmentsPositionHistory.find(
		position => position.equipmentId === equipmentId
	)
	return equipmentPosition?.positions[0] || { date: '', lat: 0, lon: 0 }
}

export function getRecentState(equipmentId: string) {
	const stateHistory = equipmentsStateHistory.find(
		state => state.equipmentId === equipmentId
	)
	const recentState = stateHistory?.states[0]
	const state = equipmentsState.find(
		state => state.id === recentState?.equipmentStateId
	)
	return {
		date: recentState?.date || '',
		equipmentStateId: recentState?.equipmentStateId || '',
		equipmentStateName: state?.name || '',
		equipmentStateColor: state?.color || '#000000',
	}
}
