import { NextRequest } from 'next/server';
import { equipmentData } from '@/mocks/equipamentData';
import { equipamentState } from '@/mocks/equipamentState';
import { equipamentModel } from '@/mocks/equipamentModel';
import { equipamentStateHistory } from '@/mocks/equipamentStateHistory';

export async function GET(req: NextRequest) {

    const equipmentId = req.nextUrl.searchParams.get('equip');
    const status = req.nextUrl.searchParams.get('status');


    let filteredEquipments = equipmentData;

    if (equipmentId) {
        filteredEquipments = filteredEquipments.filter(equipment => equipment.id === equipmentId);
    }

    

    let rows = filteredEquipments.map(equipment => {
        const stateHistory = equipamentStateHistory.find(history => history.equipmentId === equipment.id);
        const latestState = stateHistory?.states.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        const state = equipamentState.find(state => state.id === latestState?.equipmentStateId);
        const model = equipamentModel.find(model => model.id === equipment.equipmentModelId);

        const formattedDate = latestState ? new Date(latestState.date).toLocaleDateString('pt-BR') : '';

        return {
            id: equipment.id || '',
            name: equipment.name || '',
            equipament: model?.name || '',
            status: state?.name || '',
            date: formattedDate || '',
            stateId: state?.id || ''
        };
    });

    if (status) {
        rows = rows.filter(row => row.stateId === status);
    }

    const sortedRows = rows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return new Response(JSON.stringify({ sortedRows }), { status: 200 });
}