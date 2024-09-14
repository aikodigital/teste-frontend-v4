import MyContext from './MyContext';
import React, { useState } from 'react';

type ComponentWithChildren = React.FC<{ children: React.ReactNode }>;

const Provider: ComponentWithChildren = (props: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState<string>('');
  const [filterByCurrentState, setFilterByCurrentState] = useState<string>('');

  const contextValue = {
    search,
    setSearch,
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
