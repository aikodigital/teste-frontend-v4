import { useMemo } from 'react';
import { IEquipmentStateHistory, IEquipmentState } from '@/zustand/interface';
import { differenceInHours, parseISO } from 'date-fns';

interface Props {
  equipmentStateHistory?: IEquipmentStateHistory;
  states?: IEquipmentState[];
  targetStateName?: string;
}

export const useEquipmentProductivity = ({
  equipmentStateHistory,
  states = [],
  targetStateName = 'Operando'
}: Props): number => {
  const productivity = useMemo(() => {
    const stateEntries = equipmentStateHistory?.states ?? [];

    let productiveTime = 0;
    let totalTime = 0;

    for (let i = 0; i < stateEntries.length - 1; i++) {
      const current = stateEntries[i];
      const next = stateEntries[i + 1];

      const duration = differenceInHours(
        parseISO(next.date),
        parseISO(current.date)
      );

      totalTime += duration;

      const stateName = states.find(
        (s: IEquipmentState) => s.id === current.equipmentStateId
      )?.name;

      if (stateName === targetStateName) {
        productiveTime += duration;
      }
    }

    return totalTime > 0 ? (productiveTime / totalTime) * 100 : 0;
  }, [equipmentStateHistory, states, targetStateName]);

  return productivity;
};
