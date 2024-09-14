import { useEffect, useState } from "react";

import { MapComponent } from "./components/map";
import { fetchEquipments } from "./api/simulatedApi";

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
      <div className="md:w-1/2 border-4 border-neutral rounded-md shadow-xl dark:shadow-white/10">
        <MapComponent
          selectEquipment={setSelectedEquipment}
          equipments={equipments}
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-2xl font-bold">Equipment Info:</h1>

        {!selectedEquipment ? (
          <p>Por favor selecione um equipamento!</p>
        ) : (
          <p>Selecionado: {selectedEquipment.name}</p>
        )}
      </div>
    </div>
  );
}

export default App;
