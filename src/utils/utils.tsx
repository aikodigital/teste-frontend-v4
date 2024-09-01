import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentModels from '../data/equipmentModel.json';


export const formatDate = (isoDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Sao_Paulo',
    };
    return new Date(isoDate).toLocaleDateString('pt-BR', options);
};

export const calculateTotalEarnings = (modelEquipmentId: string,  equipmentId: string): number => {
    const history = equipmentStateHistory.find(h => h.equipmentId === equipmentId)?.states || [];
    
    const model = equipmentModels.find(m => m.id === modelEquipmentId);
    
    if (!model) {
        throw new Error(`Modelo de equipamento não encontrado para o ID: ${modelEquipmentId}`);
    }

    const earningsMap = model.hourlyEarnings.reduce((map, e) => {
        map[e.equipmentStateId] = e.value;
        return map;
    }, {} as Record<string, number>);

    const stateDurations = history.reduce((acc, entry, index) => {
        if (index === 0) return acc;

        const prevEntry = history[index - 1];
        const currentDate = new Date(entry.date);
        const prevDate = new Date(prevEntry.date);
        const durationHours = (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60);

        const stateId = entry.equipmentStateId;
        acc[stateId] = (acc[stateId] || 0) + durationHours;

        return acc;
    }, {} as Record<string, number>);

    return Object.entries(stateDurations).reduce((total, [stateId, duration]) => {
        const hourlyEarning = earningsMap[stateId] || 0;
        return total + (hourlyEarning * duration);
    }, 0);
};