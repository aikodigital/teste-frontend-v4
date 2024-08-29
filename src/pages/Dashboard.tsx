import { useState } from "react";
import EquipmentFilter from "../components/EquipmentFilter";
import EquipmentList from "../components/EquipmentList";
import Map from "../components/Map";
import { equipment, equipmentModel, equipmentState, equipmentStateHistory } from "../data";

export default function Dashboard() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEquipment = equipment.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase());
    const positionHistory = equipmentStateHistory.find(p => p.equipmentId === e.id);
    const latestState = positionHistory?.states[positionHistory.states.length - 1];
    const matchesState = !selectedState || latestState?.equipmentStateId === selectedState;

    const matchesModel = !selectedModel || e.equipmentModelId === selectedModel;

    return matchesSearch && matchesState && matchesModel;
  });

  function handleStateChange(stateId: string | null) {
    setSelectedState(stateId);
  }

  function handleModelChange(modelId: string | null) {
    setSelectedModel(modelId);
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4">
        <img src="aiko.png" alt="Logo Aiko" className="w-auto h-10" />
        <h2 className="text-lg font-semibold">Equipamentos</h2>
        <input 
          type="text" 
          placeholder="Buscar equipamento..." 
          className="mb-4 p-2 w-full border rounded-md text-neutral-800"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <EquipmentFilter
          states={equipmentState}
          models={equipmentModel}
          onStateChange={handleStateChange}
          onModelChange={handleModelChange}
        />
        <EquipmentList equipment={filteredEquipment} />
      </div>

      <div className="flex-1 h-full">
        <Map equipment={filteredEquipment} />
      </div>
    </div>
  )
}