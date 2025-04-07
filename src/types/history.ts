export type HistoryEntry = {
  date: Date;
  state: string;
  stateName: string;
  position: [number, number] | null;
};

export type GroupedHistory = {
  date: string; // Data formatada (dia/mês)
  entries: HistoryEntry[];
};