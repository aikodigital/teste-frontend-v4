import MyContext from './MyContext';
import React, { useState } from 'react';
import { EquipmentState } from '../interfaces/EquipmentState.interface';

type ComponentWithChildren = React.FC<{ children: React.ReactNode }>;

const Provider: ComponentWithChildren = (props: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState<string>('');
  const [stateOptions, setStateOptions] = useState<EquipmentState[]>([]);
  const [filterByCurrentState, setFilterByCurrentState] = useState<string>('');

  const contextValue = {
    search,
    setSearch,
    stateOptions,
    setStateOptions,
    filterByCurrentState,
    setFilterByCurrentState,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  );
};

export default Provider;
