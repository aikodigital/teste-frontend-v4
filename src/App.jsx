import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';
import equipmentData from './data/equipment.json';
import equipmentModelData from './data/equipmentModel.json';
import equipmentStateData from './data/equipmentState.json';
import equipmentPositionHistoryData from './data/equipmentPositionHistory.json';
import equipmentStateHistoryData from './data/equipmentStateHistory.json';
import StateHistoryModal from './components/StateHistoryModal';
import EquipmentFilter from './components/EquipmentFilter';
import EquipmentSearch from './components/EquipmentSearch';
import EquipmentStatistics from './components/EquipmentStatistics';

// Corrigir o problema dos ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function App() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [filteredState, setFilteredState] = useState('');
  const [filteredModel, setFilteredModel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [showPath, setShowPath] = useState(false);
  const [selectedEquipmentPath, setSelectedEquipmentPath] = useState([]);

  // Processar dados para facilitar o uso
  useEffect(() => {
    const processedEquipments = equipmentData.map(equipment => {
      // Encontrar modelo do equipamento
      const model = equipmentModelData.find(model => model.id === equipment.equipmentModelId);
      
      // Encontrar posições do equipamento
      const positionHistory = equipmentPositionHistoryData.find(
        history => history.equipmentId === equipment.id
      );
      
      // Encontrar estados do equipamento
      const stateHistory = equipmentStateHistoryData.find(
        history => history.equipmentId === equipment.id
      );
      
      // Obter posição mais recente
      const positions = positionHistory ? positionHistory.positions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ) : [];
      
      const lastPosition = positions.length > 0 ? positions[0] : null;
      
      // Obter estado mais recente
      const states = stateHistory ? stateHistory.states.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ) : [];
      
      const lastState = states.length > 0 ? states[0] : null;
      
      // Informações do estado atual
      const currentState = lastState 
        ? equipmentStateData.find(state => state.id === lastState.equipmentStateId)
        : null;

      return {
        ...equipment,
        model: model ? model.name : 'Desconhecido',
        modelId: equipment.equipmentModelId,
        lastPosition,
        positions,
        states,
        currentState,
        hourlyEarnings: model ? model.hourlyEarnings : []
      };
    });

    setEquipments(processedEquipments);
  }, []);

  // Filtrar equipamentos
  const filteredEquipments = equipments.filter(equipment => {
    const matchesState = filteredState === '' || 
      (equipment.currentState && equipment.currentState.id === filteredState);
    
    const matchesModel = filteredModel === '' || equipment.modelId === filteredModel;
    
    const matchesSearch = searchTerm === '' || 
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesState && matchesModel && matchesSearch;
  });

  // Calcular estatísticas para um equipamento específico
  const calculateStats = (equipment) => {
    if (!equipment || !equipment.states || equipment.states.length === 0) {
      return { productivity: 0, earnings: 0 };
    }

    // Ordenar estados do mais antigo para o mais recente
    const sortedStates = [...equipment.states].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let totalHours = 0;
    let operatingHours = 0;
    let earnings = 0;

    // Calcular o tempo em cada estado
    for (let i = 0; i < sortedStates.length; i++) {
      const currentState = sortedStates[i];
      const nextState = sortedStates[i + 1];
      
      const startTime = new Date(currentState.date);
      const endTime = nextState 
        ? new Date(nextState.date) 
        : new Date(); // Se não há próximo estado, usar o tempo atual
      
      const hoursInState = (endTime - startTime) / (1000 * 60 * 60);
      totalHours += hoursInState;
      
      // Verificar se é estado operando (assumindo que o id do estado "Operando" é o primeiro do conjunto de dados)
      const operatingStateId = equipmentStateData.find(state => state.name === "Operando")?.id;
      if (currentState.equipmentStateId === operatingStateId) {
        operatingHours += hoursInState;
      }

      // Calcular ganhos com base no valor por hora do estado
      const stateEarning = equipment.hourlyEarnings.find(
        earning => earning.equipmentStateId === currentState.equipmentStateId
      );
      
      if (stateEarning) {
        earnings += stateEarning.value * hoursInState;
      }
    }

    // Calcular produtividade (% do tempo em estado "Operando")
    const productivity = totalHours > 0 ? (operatingHours / totalHours) * 100 : 0;

    return {
      productivity: productivity.toFixed(2),
      earnings: earnings.toFixed(2)
    };
  };

  // Selecionar equipamento e mostrar modal
  const handleEquipmentSelect = (equipment) => {
    setSelectedEquipment(equipment);
    setShowModal(true);
    if (showPath) {
      setSelectedEquipmentPath(equipment.positions);
    }
  };

  // Centro do mapa (média de todas as posições)
  const mapCenter = equipments.length > 0 && equipments.some(e => e.lastPosition) 
    ? [
        equipments.reduce((sum, e) => e.lastPosition ? sum + e.lastPosition.lat : sum, 0) / 
        equipments.filter(e => e.lastPosition).length,
        equipments.reduce((sum, e) => e.lastPosition ? sum + e.lastPosition.lon : sum, 0) / 
        equipments.filter(e => e.lastPosition).length
      ] 
    : [-19.126536, -45.947756]; // Default center

  return (
    <div className="app-container">
      <header>
        <h1>Monitoramento de Equipamentos Florestais</h1>
      </header>
      
      <div className="controls">
        <EquipmentFilter 
          states={equipmentStateData}
          models={equipmentModelData}
          onStateFilterChange={setFilteredState}
          onModelFilterChange={setFilteredModel}
        />
        
        <EquipmentSearch 
          onSearchChange={setSearchTerm}
        />
        
        <div className="toggle-path">
          <label>
            <input 
              type="checkbox" 
              checked={showPath} 
              onChange={() => setShowPath(!showPath)} 
            />
            Mostrar trajeto
          </label>
        </div>
      </div>

      <div className="content-container">
        <div className="map-container">
          <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {filteredEquipments.map(equipment => (
              equipment.lastPosition ? (
                <Marker
                  key={equipment.id}
                  position={[equipment.lastPosition.lat, equipment.lastPosition.lon]}
                  icon={createCustomMarker(equipment)}
                  eventHandlers={{
                    click: () => handleEquipmentSelect(equipment),
                    mouseover: (e) => {
                      e.target.openPopup();
                    },
                    mouseout: (e) => {
                      // Comentado para manter o popup aberto até clicar fora
                      // e.target.closePopup();
                    }
                  }}
                >
                  <Tooltip>{equipment.name}</Tooltip>
                  <Popup>
                    <div>
                      <h3>{equipment.name}</h3>
                      <p>Modelo: {equipment.model}</p>
                      <p>Estado: 
                        <span 
                          style={{ 
                            color: equipment.currentState?.color || '#000', 
                            fontWeight: 'bold',
                            marginLeft: '5px'
                          }}
                        >
                          {equipment.currentState?.name || 'Desconhecido'}
                        </span>
                      </p>
                      <button onClick={() => handleEquipmentSelect(equipment)}>
                        Ver Histórico
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            ))}
            
            {/* Mostrar trajeto se ativado */}
            {showPath && selectedEquipmentPath.length > 0 && (
              <Polyline
                positions={selectedEquipmentPath.map(pos => [pos.lat, pos.lon])}
                color="blue"
                weight={3}
                opacity={0.7}
              />
            )}
          </MapContainer>
        </div>

        <div className="stats-sidebar">
          {selectedEquipment ? (
            <EquipmentStatistics 
              equipment={selectedEquipment}
              stats={calculateStats(selectedEquipment)}
            />
          ) : (
            <div className="no-equipment-selected">
              <h3>Estatísticas</h3>
              <p>Selecione um equipamento no mapa para ver suas estatísticas detalhadas.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedEquipment && (
        <StateHistoryModal 
          equipment={selectedEquipment}
          stateData={equipmentStateData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

// Função para criar marcadores personalizados com base no estado do equipamento
function createCustomMarker(equipment) {
  // Se não tem estado atual, usar marcador padrão
  if (!equipment.currentState) {
    return new L.Icon.Default();
  }

  // Criar um ícone com a cor do estado
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${equipment.currentState.color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 5px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
}

export default App;