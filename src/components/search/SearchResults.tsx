import { FC } from 'react';
import { SearchResultItem } from '../../types/search';

interface SearchResultsProps {
  results: SearchResultItem[];
  isOpen: boolean;
  onSelect: (id: string) => void;
}

const SearchResults: FC<SearchResultsProps> = ({ results, isOpen, onSelect }) => {
  // Evita renderização desnecessária quando não há resultados ou o dropdown está fechado
  if (!isOpen || results.length === 0) {
    return null;
  }

  return (
    <div 
      id="search-results"
      className="absolute z-[2000] mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
      role="listbox"
    >
      <ul className="py-1">
        {results.map((result) => (
          <li 
            key={result.id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            onClick={() => onSelect(result.id)}
            role="option"
            aria-selected="false"
            // aria-selected é mantido como false pois não implementamos seleção via teclado ainda
          >
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;