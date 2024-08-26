import { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { loadData } from '../utils/loadData';

export interface DataProps {
  id: string;
  name: string;
  model?: string;
  position: [number, number];
  state?: string;
  stateHistory?: {
    date: string;
    state: string | undefined;
    color: string | undefined;
  }[];
}

interface DataProvider {
  data: DataProps[];
  selected: DataProps | undefined;
  setSelectedID: (id?: string) => void;
}
const DataContext = createContext<DataProvider>({} as DataProvider);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedID, setSelectedID] = useState<string>();

  const data = useMemo(() => loadData(), []);

  const selected = useMemo(
    () => data.find((i) => i.id === selectedID),
    [selectedID]
  );

  const handleSelect = (id?: string) => {
    setSelectedID(id);
  };

  const value = {
    data,
    selected,
    setSelectedID: handleSelect,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
