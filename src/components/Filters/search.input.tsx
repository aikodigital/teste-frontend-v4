import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';
import { FilterState } from '../../interfaces/FilterState.interface';

function SearchInput() {
  const { setSearch } = useContext(MyContext) as FilterState;

  return (
    <div>
      <input
        type="text"
        className={`
          border rounded-lg
          border-gray-300
          focus:ring-blue-500
          shadow-sm focus:outline-none focus:ring-2
        `}
        placeholder="Pesquise um modelo específico..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
