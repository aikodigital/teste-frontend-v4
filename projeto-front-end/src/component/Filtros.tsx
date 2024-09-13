import React from "react";
import { FaSearch, FaChevronDown } from 'react-icons/fa';

export default function Filtros() {
  return (
    <div className="flex space-x-4 p-4 bg-gradient-to-r from-transparent to-transparent items-center">
      {/* Status Dropdown */}
      <div className="relative inline-block w-48">
        <select
          className="bg-white bg-opacity-80 text-black font-bold py-2 pl-4 pr-8 rounded-full shadow-md hover:bg-opacity-100 transition duration-300 focus:outline-none appearance-none w-full"
        >
          <option value="operando">Operando</option>
          <option value="parado">Parado</option>
          <option value="manutencao">Em Manutenção</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <FaChevronDown className="text-gray-600" />
        </div>
      </div>

      {/* Modelos Button */}
      <button className="bg-white bg-opacity-80 text-black font-bold py-2 px-10 rounded-full shadow-md hover:bg-opacity-100 transition duration-300">
        Modelos
      </button>

      {/* Search Bar */}
      <div className="flex items-center bg-white bg-opacity-80 rounded-full shadow-md px-4 py-2 w-72">
        <FaSearch className="text-gray-600 mr-2" />
        <input
          type="text"
          placeholder="Pesquisar"
          className="bg-transparent focus:outline-none text-black placeholder-gray-600 w-full"
        />
      </div>
    </div>
  );
}
