export interface Equipment {
	equipmentModelName: string
	position: {
		date: string
		lat: number
		lon: number
	}
	state: {
		date: string
		equipmentStateId: string
		equipmentStateName: string
		equipmentStateColor: string
	}
	id: string
	equipmentModelId: string
	name: string
	hourlyEarnings: {
		equipmentStateId: string
		value: number
	}[]
}
