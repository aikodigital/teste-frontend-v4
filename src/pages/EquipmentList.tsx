import { useState } from 'react';
import { EquipmentCard } from '../components/EquipmentCard';
import equipmentData from '../data/equipment.json';
import equipmentModelData from '../data/equipmentModel.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';

export function EquipmentList() {
  const [search, setSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const getLatestState = (equipmentId: string) => {
    const history = equipmentStateHistoryData.find(h => h.equipmentId === equipmentId);
    if (!history || history.states.length === 0) return null;
    
    const latestStateId = history.states[history.states.length - 1].equipmentStateId;
    return equipmentStateData.find(state => state.id === latestStateId) || null;
  };

  const filteredEquipment = equipmentData.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(search.toLowerCase());
    const matchesModel = !selectedModel || equipment.equipmentModelId === selectedModel;
    const currentState = getLatestState(equipment.id);
    const matchesState = !selectedState || (currentState && currentState.id === selectedState);
    
    return matchesSearch && matchesModel && matchesState;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar equipamento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">Todos os modelos</option>
            {equipmentModelData.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">Todos os estados</option>
            {equipmentStateData.map(state => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEquipment.map(equipment => (
          <EquipmentCard
            key={equipment.id}
            equipment={equipment}
            currentState={getLatestState(equipment.id)}
          />
        ))}
      </div>
    </div>
  );
}