import { IEquipment } from '../../types/equipment';
import { IEquipmentState } from '../../types/equipmentState';

interface Props {
    historyState: IEquipmentState[],
    equipment: IEquipment | undefined
}

interface StateDuration {
    equipmentStateId: string;
    hours: number;
}

export default function ProductivityCard({ historyState, equipment }: Props) {
    function calculateStateDurations(data: IEquipmentState[]) {
        return data.reduce((acc, currentState, index) => {
            if (index === data.length - 1) return acc;

            const nextState = data[index + 1];
            const currentDate = new Date(currentState.date);
            const nextDate = new Date(nextState.date);

            const diffInMs = nextDate.getTime() - currentDate.getTime();
            const diffInHours = diffInMs / (1000 * 60 * 60);

            if (!acc[currentState.equipmentStateId]) {
                acc[currentState.equipmentStateId] = 0;
            }
            acc[currentState.equipmentStateId] += diffInHours;

            return acc;
        }, {} as { [key: string]: number });
    }

    function formatDurations(durations: { [key: string]: number }): StateDuration[] {
        return Object.entries(durations).map(([equipmentStateId, hours]) => ({
            equipmentStateId,
            hours
        }));
    }

    const durations = calculateStateDurations(historyState);
    const stateDurations = formatDurations(durations);
    const operando = stateDurations.find(state => state.equipmentStateId === '0808344c-454b-4c36-89e8-d7687e692d57')?.hours ?? 0;
    const parado = stateDurations.find(state => state.equipmentStateId === 'baff9783-84e8-4e01-874b-6fd743b875ad')?.hours ?? 0;
    const manutencao = stateDurations.find(state => state.equipmentStateId === '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f')?.hours ?? 0;

    function calcProdutividade(operando: number, parado: number, manutencao: number) {
        return (Math.abs(operando) / (Math.abs(operando) + Math.abs(parado) + Math.abs(manutencao)) * 100).toFixed(0);
    }

    function calcGanho(horasOperando: number, horasManutencao: number) {
        const earnigOperando = equipment?.hourlyEarnings.find(earning => earning.equipmentStateId === '0808344c-454b-4c36-89e8-d7687e692d57')?.value ?? 0;
        const earningManuntenção = equipment?.hourlyEarnings.find(earning => earning.equipmentStateId === '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f')?.value ?? 0;

        return Math.abs(horasOperando) * earnigOperando + Math.abs(horasManutencao) * earningManuntenção;
    }

    return (
        <div className="card w-100">
            <div className="card-body">
                <h5 className="card-title">Percentual de Produtividade do equipamento: {calcProdutividade(operando, parado, manutencao)}%</h5>
                <h5 className="card-title">Ganho por equipamento: {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(calcGanho(operando, manutencao))}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Operando: {Math.abs(operando)} horas</li>
                <li className="list-group-item">Parado: {Math.abs(parado)} horas</li>
                <li className="list-group-item">Manuntenção: {Math.abs(manutencao)} horas</li>
            </ul>
        </div>
    )
}
