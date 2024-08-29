import { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { loadData } from '../utils/loadData';

export interface DataProps {
  id: string;
  name: string;
  model?: string;
  position: [number, number];
  positionHistory: [number, number][];
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
  setFilters: (args: { value: string; type: 'model' | 'state' }) => void;
}
const DataContext = createContext<DataProvider>({} as DataProvider);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedID, setSelectedID] = useState<string>();
  const [filterState, setFilterState] = useState<string>();
  const [filterModel, setFilterModel] = useState<string>();

  const filters = {
    model: filterModel,
    state: filterState,
  };

  const data = useMemo(() => loadData(), []);
  const filteredState = useMemo(() => loadData(filters), [filters]);

  const selected = useMemo(
    () => data.find((i) => i.id === selectedID),
    [selectedID]
  );

  const handleSelect = (id?: string) => {
    setSelectedID(id);
  };

  const handleFilterChange = ({
    value,
    type,
  }: {
    value: string;
    type: 'model' | 'state';
  }) => {
    switch (type) {
      case 'model':
        setFilterModel(value);

        break;

      case 'state':
        setFilterState(value);
        break;

      default:
        break;
    }
  };

  const value = {
    data: filteredState,
    selected,
    setSelectedID: handleSelect,
    setFilters: handleFilterChange,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
