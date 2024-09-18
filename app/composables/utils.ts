import { getEquipments } from '../services/index.ts'

const { equipmentStateHistory, equipmentModel, equipments } = await getEquipments();

export function formatValueReal(value: string | number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value));
}

export function calculateProductivity(equipmentId: string, stateId: string = '0808344c-454b-4c36-89e8-d7687e692d57') {
    const equipmentHistory = equipmentStateHistory.find((e: { equipmentId: string }) => e.equipmentId === equipmentId);
    if (!equipmentHistory) {
        console.warn('Histórico do equipamento não encontrado.');
        return 0;
    }

    let totalOperatingHours = 0;
    let startTime: Date | null = null;
    let endTime: Date | null = null;

    equipmentHistory.states.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());

    equipmentHistory.states.forEach((state, index) => {
        if (state.equipmentStateId === stateId) {
            startTime = new Date(state.date);

            if (index + 1 < equipmentHistory.states.length) {
                const nextState = equipmentHistory.states[index + 1];
                endTime = new Date(nextState.date);
            } else {
                endTime = new Date();
            }

            if (endTime <= startTime) {
                console.warn('Inconsistência no tempo detectada:', { startTime, endTime });
                return;
            }

            const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
            totalOperatingHours += durationInHours;
        }
    });

    if (totalOperatingHours === 0) {
        console.warn('Nenhuma hora de operação registrada.');
        return 0;
    }

    const firstStateTime = new Date(equipmentHistory.states[0].date);
    const lastStateTime = endTime || new Date();
    const totalHours = (lastStateTime.getTime() - firstStateTime.getTime()) / (1000 * 60 * 60);

    const productivity = (totalOperatingHours / totalHours) * 100;

    return productivity.toFixed(2);
}

export function calculateGain(equipmentId: string) {
    const operatingStateId = '0808344c-454b-4c36-89e8-d7687e692d57';
    const maintenanceStateId = '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f';

    const equipament = equipments.find(e => e.id === equipmentId);
    if (!equipament) {
        console.warn('Equipamento não encontrado.');
        return 0;
    }

    const equipmentHistory = equipmentStateHistory.find(e => e.equipmentId === equipmentId);
    if (!equipmentHistory) {
        console.warn('Histórico do equipamento não encontrado.');
        return 0;
    }

    const model = equipmentModel.find(m => m.id === equipament.equipmentModelId);
    if (!model) {
        console.warn('Modelo do equipamento não encontrado.');
        return 0;
    }

    const hourlyEarningsMap = new Map<string, number>(model.hourlyEarnings.map(e => [e.equipmentStateId, e.value]));

    let totalOperatingHours = 0;
    let totalMaintenanceHours = 0;

    totalOperatingHours = this.calculateProductivity(equipmentId, operatingStateId);
    totalMaintenanceHours = this.calculateProductivity(equipmentId, maintenanceStateId);

    const operatingRate = hourlyEarningsMap.get(operatingStateId) ?? 0;
    const maintenanceRate = hourlyEarningsMap.get(maintenanceStateId) ?? 0;

    const totalGain = (totalOperatingHours * operatingRate) + (totalMaintenanceHours * maintenanceRate);

    return formatValueReal(totalGain);
}

