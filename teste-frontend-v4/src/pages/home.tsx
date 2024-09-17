import React from "react";
import { EquipmentDetails } from "../components/EquipmentDetails";
import { EquipmentMap } from "../components/EquipmentMap";
import { Filter } from "../components/Filter";
import { Search } from "../components/Search";

const Home: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100 p-2">
      <section className="h-full flex flex-col md:flex-row gap-2">
        <div className="flex-1 bg-white rounded-lg shadow-lg p-2 border border-gray-300 overflow-hidden">
          <EquipmentMap />
        </div>

        <div className="md:w-1/3 flex flex-col gap-2">
          <header className="bg-white shadow p-2 rounded-md flex flex-col gap-2">
            <h1 className="text-1xl text-center font-semibold text-gray-800">
            Central de Equipamentos e Gestão
            </h1>
            <div className="flex flex-col">
              <Search />
              <Filter />
            </div>
          </header>

          <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-300 flex-1 overflow-y-auto">
            <EquipmentDetails />
          </div>
        </div>
      </section>
    </div>
  );
};

export { Home };