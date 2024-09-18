import React, { useState } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import equipmentState from '../../../data/equipmentState.json'
import { EquipmentStatusI } from "../utils/interface";

export default function Filtros({ onFilterChange, onSearch, onToggleExpand }:any) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleStatusChange = (e:any) => {
    setSelectedStatus(e.target.value);
    onFilterChange({ status: e.target.value, model: selectedModel });
  };

  const handleModelChange = (e:any) => {
    setSelectedModel(e.target.value);
    onFilterChange({ status: selectedStatus, model: e.target.value });
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const toggleMenu = () => {
    const newIsMenuOpen = !isMenuOpen;
    setIsMenuOpen(newIsMenuOpen);
    onToggleExpand(newIsMenuOpen); // Passa o novo estado de expansão para o Painel
  };

  return (
    <div className="w-full">
      {/* Botão para expandir/colapsar o menu em dispositivos móveis */}
      <button
        className="flex justify-between items-center bg-white bg-opacity-80 text-black font-bold py-2 px-4 w-full sm:hidden rounded-full shadow-md"
        onClick={toggleMenu}
      >
        <span>Filtros</span>
        {isMenuOpen ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
      </button>

      {/* Menu de filtros expansível */}
      <div className={`flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 p-4 bg-gradient-to-r from-transparent to-transparent items-center ${isMenuOpen ? 'flex' : 'hidden'} sm:flex`}>
        {/* Status Dropdown */}
        <div className="relative inline-block w-full sm:w-52">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="bg-white bg-opacity-80 text-black font-bold py-2 pl-4 pr-8 rounded-full shadow-md hover:bg-opacity-100 transition duration-300 focus:outline-none appearance-none w-full"
          >
            <option value="">Todos os estados</option>
            {
              equipmentState.map((e:EquipmentStatusI) => {
                return (<option key={e.id + e.name} value={e?.id}>{e?.name}</option>)
              })
            }
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaChevronDown className="text-gray-600" />
          </div>
        </div>

        {/* Modelos Dropdown */}
        <div className="relative inline-block w-full sm:w-52">
          <select
            value={selectedModel}
            onChange={handleModelChange}
            className="bg-white bg-opacity-80 text-black font-bold py-2 pl-4 pr-8 rounded-full shadow-md hover:bg-opacity-100 transition duration-300 focus:outline-none appearance-none w-full"
          >
            <option value="">Todos os modelos</option>
            <option value="Harvester">Harvester</option>
            <option value="Caminhão de carga">Caminhão de carga</option>
            <option value="Garra traçadora">Garra traçadora</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaChevronDown className="text-gray-600" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white bg-opacity-80 rounded-full shadow-md px-4 py-2 w-full sm:w-72">
          <FaSearch className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent focus:outline-none text-black placeholder-gray-600 w-full"
          />
        </div>

        <button
          className="bg-white bg-opacity-80 text-black font-bold py-2 px-6 rounded-full shadow-md hover:bg-opacity-100 transition duration-300 w-full sm:w-auto"
          onClick={handleSearch}
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}
