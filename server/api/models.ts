import equipmentsModel from '../data/equipmentModel.json'

export default defineEventHandler(async event => {
	return equipmentsModel
})
