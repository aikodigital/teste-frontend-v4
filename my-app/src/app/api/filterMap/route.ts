import { NextRequest } from "next/server";
import { equipamentPositionHistory } from '@/mocks/equipamentPositionHistory';

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    const equipment = equipamentPositionHistory.find(e => e.equipmentId === id);

    if (!equipment) {
        return new Response(JSON.stringify({ error: 'Equipment not found' }), { status: 404 });
    }

    // Ordena as posições pela data mais recente
    const latestPosition = equipment.positions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    if (!latestPosition) {
        return new Response(JSON.stringify({ error: 'No positions found for this equipment' }), { status: 404 });
    }

    return new Response(JSON.stringify({
        lat: latestPosition.lat,
        lon: latestPosition.lon,
    }), { status: 200 });
}