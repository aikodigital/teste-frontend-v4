import { useState } from 'react';
import MapComponent from '../../components/Mapa';
import Modal from '../../components/Modal';
import Busca from '../../components/Busca';
import Filtro from '../../components/Filtro';
import {
  getEquipmentPositions,
  getEquipmentStateHistory,
  getEquipmentStates,
} from '../../services';

function Home() {
  const equipmentPositions = getEquipmentPositions();
  const equipmentStateHistory = getEquipmentStateHistory();
  const equipmentStates = getEquipmentStates();

  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [stateFilters, setStateFilters] = useState({
    operando: true,
    parado: true,
    manutencao: true,
  });

  const getEquipmentStatePopup = (equipmentId) => {
    const history = equipmentStateHistory.find(
      (item) => item.equipmentId === equipmentId
    );
    if (!history || !history.states || history.states.length === 0) {
      return 'Sem informações';
    }
    const sortedStates = [...history.states].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const latestState = sortedStates[sortedStates.length - 1];
    const stateDetails = equipmentStates.find(
      (st) => st.id === latestState.equipmentStateId
    );
    if (!stateDetails) {
      return 'Estado desconhecido';
    }
    return (
      <>
        <strong>{stateDetails.name}</strong>
        <br />
        <span style={{ color: stateDetails.color }}>Estado Atual</span>
      </>
    );
  };

  const getCurrentStateDetails = (equipmentId) => {
    const history = equipmentStateHistory.find(
      (item) => item.equipmentId === equipmentId
    );
    if (!history || !history.states || history.states.length === 0) {
      return null;
    }
    const sortedStates = [...history.states].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const latestState = sortedStates[sortedStates.length - 1];
    return equipmentStates.find((st) => st.id === latestState.equipmentStateId);
  };

  const handleMarkerClick = (equipment) => {
    setSelectedEquipmentId(equipment.equipmentId);
    setModalOpen(true);
  };

  const getModalContent = () => {
    if (!selectedEquipmentId) {
      return <div>Nenhum equipamento selecionado.</div>;
    }
    const found = equipmentStateHistory.find(
      (item) => item.equipmentId === selectedEquipmentId
    );
    if (!found || !found.states || found.states.length === 0) {
      return <div>Nenhum histórico para este equipamento.</div>;
    }
    const sortedStates = [...found.states].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return (
      <div>
        <h2 className="text-xl mb-4">Histórico de Estados</h2>
        <ul>
          {sortedStates.map((st, idx) => {
            const stDetails = equipmentStates.find(
              (s) => s.id === st.equipmentStateId
            );
            const stName = stDetails ? stDetails.name : 'Desconhecido';
            const stColor = stDetails ? stDetails.color : '#000';
            return (
              <li key={idx}>
                {new Date(st.date).toLocaleString()} -{' '}
                <span style={{ color: stColor }}>{stName}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const filteredEquipmentPositions = equipmentPositions.filter((equip) => {
    let matchesSearch = true;
    if (searchTerm) {
      matchesSearch =
        (equip.name &&
          equip.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (equip.equipmentId &&
          equip.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    let matchesState = true;
    const stateDetails = getCurrentStateDetails(equip.equipmentId);
    if (stateDetails) {
      const normalized = stateDetails.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      matchesState = stateFilters[normalized];
    }
    return matchesSearch && matchesState;
  });

  return (
    <div>
      <div className="bg-blue-50 p-4 flex items-center justify-between fixed top-0 w-full z-500 shadow-md">
        <img src="/img/aiko.png" alt="Aiko Logo" className="w-16 ml-4" />
        <div className="flex-1 flex justify-center ml-20">
          <Busca searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="mr-4">
          <Filtro
            stateFilters={stateFilters}
            setStateFilters={setStateFilters}
          />
        </div>
      </div>
      <MapComponent
        equipmentPositions={filteredEquipmentPositions}
        onMarkerClick={handleMarkerClick}
        getEquipmentStatePopup={getEquipmentStatePopup}
      />

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {getModalContent()}
      </Modal>
    </div>
  );
}

export default Home;
