import { useMemo } from 'react';
import { IEquipmentStateHistory, IEquipmentModel } from '@/zustand/interface';
import { differenceInHours, parseISO } from 'date-fns';

interface Props {
  equipmentStateHistory?: IEquipmentStateHistory;
  equipmentModel?: IEquipmentModel;
}

export const useEquipmentEarnings = ({
  equipmentStateHistory,
  equipmentModel
}: Props): number => {
  return useMemo(() => {
    const stateEntries = equipmentStateHistory?.states ?? [];
    const hourlyEarningsMap = new Map(
      (equipmentModel?.hourlyEarnings ?? []).map(e => [
        e.equipmentStateId,
        e.value
      ])
    );
    let total = 0;
    for (let i = 0; i < stateEntries.length - 1; i++) {
      const current = stateEntries[i];
      const next = stateEntries[i + 1];
      const startDate = parseISO(current.date);
      const endDate = parseISO(next.date);
      const duration = differenceInHours(endDate, startDate);
      const rate = hourlyEarningsMap.get(current.equipmentStateId) ?? 0;
      total += rate * duration;
    }

    return total;
  }, [equipmentStateHistory?.states, equipmentModel?.hourlyEarnings]);
};
