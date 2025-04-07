import { EnrichedEquipmentState, EquipmentStateRecord, HourlyEarning, Position } from '@/types/equipment';
import equipment from '../data/equipment.json';
import equipmentModel from '../data/equipmentModel.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';

const MS_PER_HOUR = 1000 * 60 * 60;
const now = new Date();
const periodEnd = now.getTime();
const periodStart = periodEnd - 24 * MS_PER_HOUR;

const getPositions = (equipmentId: string) => {
  return equipmentPositionHistory.find(p => p.equipmentId === equipmentId)?.positions || [];
}

const getStates = (equipmentId: string) => {
  return equipmentStateHistory.find(s => s.equipmentId === equipmentId)?.states || [];
}

const enrichStateHistory = (states: EquipmentStateRecord[], positions: Position[]) => {
  return states.map(state => {
    const closestPosition = positions.reduce((closest, pos) => {
      const stateDate = new Date(state.date).getTime();
      const posDate = new Date(pos.date).getTime();
      const closestDate = new Date(closest.date).getTime();

      return Math.abs(posDate - stateDate) < Math.abs(closestDate - stateDate) ? pos : closest;
    }, positions[0]);

    const stateInfo = equipmentState.find(s => s.id === state.equipmentStateId);

    return {
      date: state.date,
      equipmentStateId: state.equipmentStateId,
      lat: closestPosition?.lat || 0,
      lon: closestPosition?.lon || 0,
      name: stateInfo?.name || 'Desconhecido',
      color: stateInfo?.color || '#ccc',
    };
  });
}

const calculateProductivityAndEarnings = (
  stateHistory: EnrichedEquipmentState[],
  model: { hourlyEarnings: HourlyEarning[] }
) => {
  console.log(stateHistory);
  
  let totalOperandoMs = 0;
  let totalEarnings = 0;

  for (let i = 0; i < stateHistory.length; i++) {
    const current = stateHistory[i];
    const next = stateHistory[i + 1];

    const start = new Date(current.date).getTime();
    const end = next ? new Date(next.date).getTime() : periodEnd;

    if (end <= periodStart || start >= periodEnd) continue;

    const effectiveStart = Math.max(start, periodStart);
    const effectiveEnd = Math.min(end, periodEnd);
    const durationMs = effectiveEnd - effectiveStart;

    if (current.name === 'Operando') {
      totalOperandoMs += durationMs;
    }

    const hourlyRate =
      model?.hourlyEarnings.find(
        (h: HourlyEarning) => h.equipmentStateId === current.equipmentStateId
      )?.value || 0;

    totalEarnings += (durationMs / MS_PER_HOUR) * hourlyRate;
  }

  const totalPeriodMs = periodEnd - periodStart;
  const productivity = totalPeriodMs > 0 ? (totalOperandoMs / totalPeriodMs) * 100 : 0;

  return {
    productivity,
    earnings: Math.round(totalEarnings),
  };
}


export const buildEquipmentDetails = () => {
  return equipment.map(eq => {
    const model = equipmentModel.find(m => m.id === eq.equipmentModelId)!;
    const positions = getPositions(eq.id);
    const states = getStates(eq.id);
    const enrichedStateHistory = enrichStateHistory(states, positions);
    console.log({enrichStateHistory});
    

    const { productivity, earnings } = calculateProductivityAndEarnings(enrichedStateHistory, model);

    const currentPosition = positions[positions.length - 1];
    const lastState = enrichedStateHistory[enrichedStateHistory.length - 1];

    return {
      id: eq.id,
      name: eq.name,
      model,
      positions,
      currentPosition: currentPosition || { date: '', lat: 0, lon: 0 },
      currentState: lastState
        ? {
            id: lastState.equipmentStateId,
            name: lastState.name,
            color: lastState.color,
          }
        : { id: '', name: 'Desconhecido', color: '#ccc' },
      stateHistory: enrichedStateHistory,
      productivity,
      earnings,
    };
  });
}
