import { defineStore } from 'pinia';
import equipmentHistoryData from '../data/equipmentPositionHistory.json';
import equipmentData from '../data/equipment.json';
import statuses from '../data/equipmentState.json';
import equipmentState from '../data/equipmentStateHistory.json';
import models from '../data/equipmentModel.json';

export const getEquipments = defineStore('equipment', {
    state: () => ({
        equipmentData: equipmentData,
        equipmentHistoryData: equipmentHistoryData,
        statuses: statuses,
        equipmentState: equipmentState,
        models: models,
    }),
    getters: {
        statusOptions: (state) => state.statuses,
    },
    actions: {
        getEquipmentName(id: string): string {
            const equipment = this.equipmentData.find((e) => e.id === id);
            return equipment ? equipment.name : 'Desconhecido';
        },

        getEquipmentModel(id: string): string {
            const equipment = this.equipmentData.find((e) => e.id === id);
            return equipment ? equipment.equipmentModelId : 'Desconhecido';
        },

        getLatestState(equipmentId: string) {
            const equipment = this.equipmentState.find((e) => e.equipmentId === equipmentId);
            if (equipment) {
                const latestState = equipment.states.sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                )[0];
                return latestState
                    ? this.getStatusDetails(latestState.equipmentStateId)
                    : undefined;
            }
            return undefined;
        },

        getEquipmentHistory(equipmentId: string) {
            const equipment = this.equipmentState.find((e) => e.equipmentId === equipmentId);
            if (equipment) {
                return equipment.states.map((state) => ({
                    date: state.date,
                    statusName:
                        this.getStatusDetails(state.equipmentStateId)?.name || 'Desconhecido',
                    statusColor:
                        this.getStatusDetails(state.equipmentStateId)?.color || '#000000',
                }));
            }
            return [];
        },

        getStatusDetails(statusId: string) {
            return this.statuses.find((s) => s.id === statusId);
        },

        getFilteredEquipmentPositions(
            search: string,
            selectedStatus: string | null,
            selectedModel: string | null
        ) {
            return this.equipmentHistoryData.map((equipment) => {
                const lastPosition = equipment.positions[equipment.positions.length - 1];
                const latestStatus = this.getLatestState(equipment.equipmentId);
                return {
                    id: equipment.equipmentId,
                    name: this.getEquipmentName(equipment.equipmentId),
                    position: {
                        lat: lastPosition.lat,
                        lng: lastPosition.lon,
                    },
                    modelId: this.getEquipmentModel(equipment.equipmentId),
                    statusColor: latestStatus?.color || '#000000',
                };
            }).filter((equipment) => {
                const statusMatches = selectedStatus
                    ? this.getLatestState(equipment.id)?.id === selectedStatus
                    : true;
                const modelMatches = selectedModel
                    ? equipment.modelId === selectedModel
                    : true;
                const searchMatches = search
                    ? equipment.name.toLowerCase().includes(search.toLowerCase())
                    : true;

                return statusMatches && modelMatches && searchMatches;
            });
        },
    },
});
