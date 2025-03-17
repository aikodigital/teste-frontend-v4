// Constants
import type { IEquipmentsWithMoreInfos, IFilters, IState } from './equipments.schema';
import equipments from '@/data/equipment.json';
import states from '@/data/equipmentState.json';
import models from '@/data/equipmentModel.json';
import positions from '@/data/equipmentPositionHistory.json';
import statesHistory from '@/data/equipmentStateHistory.json';

// Types

export const useEquipmentsStore = defineStore('equipments', {
	state: (): IState => ({
		states: [],
		models: [],
		positions: [],
		equipments: [],
		stateHistory: [],
		selectedEquipment: null,
		filters: {
			name: '',
			models: [],
			states: [],
		},
	}),
	getters: {
		equipmentsWithMoreInfos: (state): IEquipmentsWithMoreInfos[] => {
			return state.equipments.map((eqp) => {
				// Recupera a última posição do equipamento.
				const last_position = state.positions.filter(p => p.equipmentId === eqp.id).pop()!.positions.slice(-1)[0];
				// Recupera o modelo do equipamento.
				const model = state.models.filter(m => m.id === eqp.equipmentModelId).pop();
				// Recupera o último estado do equipamento.
				const last_state
					= state.stateHistory
						.filter(sh => sh.equipmentId === eqp.id)
						.pop()!.states.slice(-1)[0];

				const last_state_type = state.states.find(s => s.id === last_state!.equipmentStateId);

				return {
					...eqp,
					last_position,
					model,
					last_state: {
						date: last_state.date ?? '', // Usa string vazia como fallback
						equipmentStateId: last_state.equipmentStateId ?? '', // Usa string vazia como fallback
						type: last_state_type ?? { id: '', name: 'Desconhecido', color: '#000000' }, // Fallback para `type`
					},
				};
			}).filter((eqp) => {
				if (state.filters.name && !eqp.name.toLocaleLowerCase().includes(state.filters.name.toLocaleLowerCase())) return false;
				if (state.filters?.models?.length && !state.filters.models.includes(eqp.model!.name)) return false;
				if (state.filters?.states?.length && !state.filters.states.includes(eqp.last_state.type.name)) return false;

				return true;
			});
		},
		positionsByEquipmentId: state => state.positions.filter(p => p.equipmentId === state?.selectedEquipment?.id).pop()?.positions,
		statesHistoryByEquipmentId: state => state.stateHistory.filter(sh => sh.equipmentId === state?.selectedEquipment?.id).pop()?.states.map(s => ({ ...s, ...state.states.find(st => st.id === s.equipmentStateId) })),
	},
	actions: {
		async getEquipments() {
			this.equipments = equipments;
		},
		async getStates() {
			this.states = states;
		},
		async getEquipmentsModels() {
			this.models = models;
		},
		async getEquipmentsPositionHistory() {
			this.positions = positions;
		},
		async getEquipmentStateHistory() {
			this.stateHistory = statesHistory;
		},
		async filterEquipments(filters?: IFilters) {
			this.filters = filters || {};
		},
	},
});
