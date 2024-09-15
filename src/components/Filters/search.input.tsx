import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';
import { FilterState } from '../../interfaces/FilterState.interface';

function SearchInput() {
  const { setSearch } = useContext(MyContext) as FilterState;

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquise sobre um equipamento específico"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
