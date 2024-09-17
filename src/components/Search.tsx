import React, { useState } from "react";
import { useEquipmentContext } from "../contexts/equipment";

const Search: React.FC = () => {
  const { filterByName, clearFilters } = useEquipmentContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      clearFilters();
    } else {
      filterByName(e.target.value);
    }
  };

  return (
    <div className="flex flex-row items-center space-x-2 max-w-xs p-2">
      <input
        type="text"
        placeholder="Buscar por nome (Ex.: CA-0001)"
        value={searchTerm}
        onChange={handleSearch}
        className="px-2 py-1 border border-gray-300 rounded-lg w-full"
      />
      <button
        onClick={() => {
          clearFilters();
          setSearchTerm("");
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm"
      >
        Limpar
      </button>
    </div>
  );
};

export { Search };