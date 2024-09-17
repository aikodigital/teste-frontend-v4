import { equipmentData } from '@/mocks/equipamentData';
import { equipamentState } from '@/mocks/equipamentState';
import { equipamentModel } from '@/mocks/equipamentModel';
import { equipamentStateHistory } from '@/mocks/equipamentStateHistory';
import { equipamentPositionHistory } from '@/mocks/equipamentPositionHistory';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        // Encontrar o equipamento pelo ID
        const equipment = equipmentData.find(e => e.id === id);
        if (!equipment) {
            return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
        }

        // Encontrar o histórico de estados do equipamento
        const stateHistory = equipamentStateHistory.find(e => e.equipmentId === id);
        if (!stateHistory) {
            return NextResponse.json({ error: 'State history not found' }, { status: 404 });
        }

        // Encontrar o histórico de posições do equipamento
        const positionHistory = equipamentPositionHistory.find(e => e.equipmentId === id);
        if (!positionHistory) {
            return NextResponse.json({ error: 'Position history not found' }, { status: 404 });
        }

        // Encontrar o modelo do equipamento
        const equipmentModel = equipamentModel.find(m => m.id === equipment.equipmentModelId);
        if (!equipmentModel) {
            return NextResponse.json({ error: 'Equipment model not found' }, { status: 404 });
        }

        // Calcular a produtividade e o ganho por equipamento
        const totalHours = 24; // Considerando um dia de 24 horas
        let productiveHours = 0;
        let totalEarnings = 0;

        const stateEarnings: { [key: string]: number } = {};
        const stateHours: { [key: string]: number } = {};

        stateHistory.states.forEach(state => {
            const stateInfo = equipamentState.find(s => s.id === state.equipmentStateId);
            if (!stateInfo) {
                throw new Error(`State info not found for state ID: ${state.equipmentStateId}`);
            }

            const hourlyEarning = equipmentModel.hourlyEarnings.find(e => e.equipmentStateId === state.equipmentStateId);
            if (!hourlyEarning) {
                throw new Error(`Hourly earning not found for state ID: ${state.equipmentStateId}`);
            }

            const hoursInState = 1; // Supondo que cada estado dura 1 hora para simplificação
            if (stateInfo.name === 'Operando') {
                productiveHours += hoursInState;
            }
            totalEarnings += hoursInState * hourlyEarning.value;

            if (!stateEarnings[stateInfo.name]) {
                stateEarnings[stateInfo.name] = 0;
                stateHours[stateInfo.name] = 0;
            }
            stateEarnings[stateInfo.name] += hoursInState * hourlyEarning.value;
            stateHours[stateInfo.name] += hoursInState;
        });

        const productivity = (productiveHours / totalHours) * 100;

        // Ordenar as posições pela data do mais recente para o mais antigo
        const sortedPositions = positionHistory.positions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const result = sortedPositions.map(position => {
            // Encontrar o estado mais próximo da data da posição
            const closestState = stateHistory.states.reduce((prev, curr) => {
                return Math.abs(new Date(curr.date).getTime() - new Date(position.date).getTime()) <
                       Math.abs(new Date(prev.date).getTime() - new Date(position.date).getTime()) ? curr : prev;
            });

            const stateId = closestState?.equipmentStateId;
            const stateName = equipamentState.find(state => state.id === stateId)?.name;

            const stateProductivity = stateName === 'Operando' ? ((stateHours[stateName] || 0) / totalHours * 100).toFixed(2) + '%' : '0.00%';

            return {
                name: equipment.name,
                status: stateName || 'Unknown',
                date: position.date,
                value: stateName ? stateEarnings[stateName] : 0,
                productivity: stateProductivity
            };
        });

        const overallResult = {
            name: equipment.name,
            value: totalEarnings,
            productivity: productivity.toFixed(2) + '%'
        };

        return NextResponse.json({ result, overallResult }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}