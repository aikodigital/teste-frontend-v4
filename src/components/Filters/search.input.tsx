import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';

interface FilterState {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

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
