import { useState, useEffect, useRef, FC, ChangeEvent } from "react";
import { Search } from "lucide-react";
import { SearchInput } from "./ui/SearchInput";
import { useEquipment } from "../hooks/useEquipment";
import SearchResults from "./search/SearchResults";
import { useClickOutside } from "../hooks/useClickOutside";
import { SearchResultItem } from "../types/search";

const EquipmentSearch: FC = () => {
  // Obtém dados e funções do contexto global de equipamentos
  const { 
    filteredEquipment, 
    getEquipmentName, 
    openEquipmentHistory 
  } = useEquipment();
  
  // Estados para controlar a busca e exibição dos resultados
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  
  // Referência para detectar cliques fora do componente de busca
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Fecha o dropdown quando o usuário clica fora da área de busca
  useClickOutside(searchRef, () => setIsDropdownOpen(false));

  // Filtra equipamentos com base no termo de busca
  // Atualiza resultados em tempo real conforme o usuário digita
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const normalizedSearchTerm = searchTerm.toLowerCase();
    
    const results = filteredEquipment
      .filter(equipment => {
        const equipmentName = getEquipmentName(equipment.id).toLowerCase();
        return equipmentName.includes(normalizedSearchTerm);
      })
      .map(equipment => ({
        id: equipment.id,
        name: getEquipmentName(equipment.id)
      }));

    setSearchResults(results);
    // Mostra dropdown apenas se houver resultados para exibir
    setIsDropdownOpen(results.length > 0);
  }, [searchTerm, filteredEquipment, getEquipmentName]);

  // Atualiza o termo de busca conforme o usuário digita
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Navega para a página de detalhes do equipamento selecionado
  // e limpa a busca para melhorar a experiência do usuário
  const handleSelectEquipment = (equipmentId: string) => {
    openEquipmentHistory(equipmentId);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <SearchInput 
          type="text" 
          placeholder="Buscar equipamentos..." 
          className="pl-9 pr-4 py-2 w-full"
          value={searchTerm}
          onChange={handleSearch}
          // Reabre o dropdown ao focar, se houver um termo de busca
          onFocus={() => searchTerm.trim() !== "" && setIsDropdownOpen(true)}
          aria-label="Buscar equipamentos"
          aria-expanded={isDropdownOpen}
          aria-controls="search-results"
        />
        {/* Ícone posicionado dentro do campo para interface consistente */}
        <Search 
          className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" 
          aria-hidden="true"
        />
      </div>

      {/* Componente de resultados separado para melhor organização e reutilização */}
      <SearchResults 
        results={searchResults}
        isOpen={isDropdownOpen}
        onSelect={handleSelectEquipment}
      />
    </div>
  );
};

export default EquipmentSearch;