import { computed, ref } from 'vue';

export type HistoryRecord = { date: string };

type History<T extends HistoryRecord, RK extends string> = {
  [K in RK | 'equipmentId']: K extends 'equipmentId' ? string : T[];
};

export const useHistory = <
  T extends HistoryRecord,
  RK extends string,
  H extends History<T, RK> = History<T, RK>,
>() => {
  const historyRes = ref<H[]>([]);

  const historyDict = computed<Record<string, T[]>>(() =>
    historyRes.value.reduce((acc, record) => {
      const { equipmentId, ...history } = record as H;
      const historyList = Object.values(history).flat() as T[];

      historyList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return {
        ...acc,
        [equipmentId]: historyList,
      };
    }, {}),
  );

  const init = (res: H[]) => {
    historyRes.value = [...res];
  };

  const getHistory = (equipmentId: string) => {
    const [current, ...past] = historyDict.value[equipmentId];

    return { current, past };
  };

  return [init, getHistory] as const;
};
