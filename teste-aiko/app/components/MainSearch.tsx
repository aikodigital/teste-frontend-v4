import { useState } from "react";
import { Search } from "lucide-react";
import { iconShow } from '../../store/iconShow';
import { statusFilter } from '../../store/statusFilter'

interface MainSearchProps {
  onFilterChange: (filters: { searchTerm: string; status: string }) => void;
  onClearFilters: () => void;
}

export const MainSearch = ({ onFilterChange, onClearFilters }: MainSearchProps) => {
  const iconSwitch = iconShow((state) => state.toggleIconShowStatus);
  const statusToggle = statusFilter((state) => state.setStatus);
  const statusValue = statusFilter((state) => state.Status);
  const [searchTerm, setSearchTerm] = useState("");
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onFilterChange({searchTerm: e.target.value, status: ''});
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    statusToggle(e.target.value as 'Todos os Status' | 'Operando' | 'Manutenção' | 'Parado');
    onFilterChange({ searchTerm, status: e.target.value });
  };

  const clearFilters = () => {
    statusToggle("Todos os Status");
    setSearchTerm("");
    onClearFilters();
  };

  return (
    <div className="flex justify-center items-center bg-gray-800 h-16 gap-4 fixed top-[5%] left-[50%] transform -translate-x-1/2 z-[1000] shadow-lg rounded-2xl p-4">
      <Search className="text-gray-400 w-6 h-6" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Pesquisar..."
        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
      />
      <select
        value={statusValue}
        onChange={handleStatusChange}
        className="bg-gray-700 text-white py-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="Todos os Status">Todos os Status</option>
        <option value="Operando">Operando</option>
        <option value="Manutenção">Manutenção</option>
        <option value="Parado">Parado</option>
      </select>
      <button
        onClick={clearFilters}
        className="h-14 rounded-xl bg-red-500 text-white py-2 px-4 focus:ring-2 focus:ring-red-500 focus:outline-none"
      >
        Limpar Filtros
      </button>

      <button className="px-4" onClick={iconSwitch}>
        Mostrar {iconShow((state) => state.iconShowStatus) ? "Status" : "Equipamento"}
      </button>
    </div>
  );
};
