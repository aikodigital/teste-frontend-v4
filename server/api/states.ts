import equipmentsState from '../data/equipmentState.json'

export default defineEventHandler(async event => {
	return equipmentsState
})
