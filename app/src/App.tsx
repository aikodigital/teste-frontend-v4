import { useEffect, useState } from "react";

import { MapComponent } from "./components/map";
import { fetchEquipments } from "./api/simulatedApi";
import { EquipmentInfo } from "./components/equipmentInfo";

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

function App() {
  // Here I would use something like TenStack Query if it was an actual api call
  const [equipments] = useState(() => fetchEquipments());

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );

  useEffect(() => {
    console.log(selectedEquipment);
  }, [selectedEquipment]);

  return (
    <div className="flex flex-col md:flex-row p-2 md:p-8 gap-4 min-h-[60vh]">
      <div className="md:w-1/2 p-1 border-2 border-neutral dark:border-white/80 rounded-md shadow-xl dark:shadow-white/10">
        <MapComponent
          selectEquipment={setSelectedEquipment}
          equipments={equipments}
        />
      </div>
      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Informações do Equipamento:</h1>

        {!selectedEquipment ? (
          <p>Por favor selecione um equipamento!</p>
        ) : (
          <EquipmentInfo equipment={selectedEquipment} />
        )}
      </div>
    </div>
  );
}

export default App;
