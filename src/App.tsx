import React from "react";
import Map from "./components/Map";
import {
  EquipmentProvider
} from "./context/EquipamentContext";
import EquipmentInfo from "./components/Equipament";
import MapRoute from "./components/Map/partials/MapFilters";

const App: React.FC = () => {
  return (
    <EquipmentProvider>
      <MainContent />
    </EquipmentProvider>
  );
};

const MainContent: React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="max-w-[1600px] w-full mx-auto my-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-start">
          {/* Card para o Mapa */}
          <div className="flex-1 max-w-[800px] w-full rounded-lg">
            <div className="flex justify-between items-center border-b-4
             border-indigo-500 bg-gray-900 text-white p-4 rounded-t-lg">
              <h2 className="text-2xl font-bold">Mapa</h2>
              <MapRoute /> 
            </div>
            <Map showRoutes={false} />{" "}
          </div>

          {/* Card para a tabela */}
          <div className="flex-1 max-w-[800px] w-full rounded-lg shadow-lg">
            <EquipmentInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
