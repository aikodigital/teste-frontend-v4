import { equipmentStatesHistory, equipmentStatesInfoList } from './sharedData';

// Função para calcular a produtividade do equipamento
export const calculateProductivity = (equipmentId: string): string => {
    // Encontrar o histórico de estados do equipamento
    const equipmentStateHistory = equipmentStatesHistory.find(state => state.equipmentId === equipmentId)?.states || [];

    let productiveHours = 0;
    let totalHours = 0;

    const operatingStateId = equipmentStatesInfoList.find(info => info.name === 'Operando')?.id;

    // Percorrer o histórico de estados e calcular as horas em cada estado
    equipmentStateHistory.forEach((state, index) => {
        if (index < equipmentStateHistory.length - 1) {
            const currentDate = new Date(state.date).getTime();
            const nextDate = new Date(equipmentStateHistory[index + 1].date).getTime();
            const hoursSpent = (nextDate - currentDate) / (1000 * 60 * 60); // Converte de milissegundos para horas

            totalHours += hoursSpent;
            if (state.equipmentStateId === operatingStateId) {
                productiveHours += hoursSpent;
            }
        }
    });

    // Considerar as horas restantes até o fim do dia, se aplicável
    if (equipmentStateHistory.length > 0) {
        const lastState = equipmentStateHistory[equipmentStateHistory.length - 1];
        const lastDate = new Date(lastState.date).getTime();
        const now = new Date().getTime();
        const remainingHours = (now - lastDate) / (1000 * 60 * 60); // Horas desde o último estado até agora

        totalHours += remainingHours;
        if (lastState.equipmentStateId === operatingStateId) {
            productiveHours += remainingHours;
        }
    }

    totalHours = totalHours > 0 ? totalHours : 24;
    const productivity = (productiveHours / totalHours) * 100;

    return productivity.toFixed(2); // Retorna a produtividade com 2 casas decimais
};