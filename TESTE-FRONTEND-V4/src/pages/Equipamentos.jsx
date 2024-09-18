import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import equipmentData from '../data/equipment.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json';

function EquipmentHistory({ history }) {
  return history.length > 0 ? (
    <ul className="bg-white shadow-md rounded-lg p-4">
      {history.map((state, index) => (
        <li
          key={index}
          className="p-4 mb-2 rounded-lg text-white"
          style={{ backgroundColor: state.stateColor }}
        >
          <strong>{state.stateName}</strong>
          <p>Data: {new Date(state.date).toLocaleDateString()}</p>
          <p>Horas: {state.hours || 0} horas</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-600">Nenhum histórico encontrado para este equipamento.</p>
  );
}

EquipmentHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      stateName: PropTypes.string.isRequired,
      stateColor: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      hours: PropTypes.number,
      equipmentStateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default function Equipamentos() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentHistory, setEquipmentHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = equipmentData.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedEquipment) {
      const equipmentHistoryData = equipmentStateHistory.find(e => e.equipmentId === selectedEquipment);
      if (equipmentHistoryData) {
        const history = equipmentHistoryData.states.map(state => {
          const stateData = equipmentState.find(e => e.id === state.equipmentStateId);
          return {
            ...state,
            stateName: stateData ? stateData.name : 'Estado desconhecido',
            stateColor: stateData ? stateData.color : '#000',
            hours: state.hours || 0,
          };
        });
        setEquipmentHistory(history);
      } else {
        setEquipmentHistory([]);
      }
    }
  }, [selectedEquipment]);

  const handleClickEquipment = (equipmentId) => {
    setSelectedEquipment(equipmentId);
  };

  const getEquipmentName = (equipmentId) => {
    const equipment = equipmentData.find(e => e.id === equipmentId);
    return equipment ? equipment.name : 'Equipamento Desconhecido';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Lista de Equipamentos</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Pesquisar equipamento..."
          className="border rounded-lg p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredEquipment.map((equipment) => (
          <div
            key={equipment.id}
            className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
            onClick={() => handleClickEquipment(equipment.id)}
          >
            <h2 className="text-xl font-semibold">{equipment.name}</h2>
            <p>ID: {equipment.id}</p>
          </div>
        ))}
      </div>

      {selectedEquipment && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Histórico de Estados: {getEquipmentName(selectedEquipment)}
          </h2>

          <div className="grid grid-cols-1">
            <div>
              <EquipmentHistory history={equipmentHistory} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
