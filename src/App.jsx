import './App.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet';
import Modal from 'react-modal';
import MarkerClusterGroup from "react-leaflet-cluster"
import equipment from "../data/equipment.json"
import equipmentModel from "../data/equipmentModel.json"
import equipmentPositionHistory from "../data/equipmentPositionHistory.json"
import equipmentState from "../data/equipmentState.json"
import equipmentStateHistory from "../data/equipmentStateHistory.json"
import { useState } from 'react';
import { Filter } from './components/Filter';
import redIcon from "../img/redIcon.png"
import yellowIcon from "../img/yellowIcon.png"
import greenIcon from "../img/greenIcon.png"

Modal.setAppElement('#root');

function App() {

  const [selectedHistory, setSelectedHistory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedProductivity, setSelectedProductivity] = useState(null);
  const [isProductivityModalOpen, setIsProductivityModalOpen] = useState(false);


  // Função para obter a posição mais recente de um equipamento
  const getLatestPosition = (positions) => {
    return positions.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
  };

  // Função para obter o estado mais recente de um equipamento
  const getLatestState = (states) => {
    return states.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
  };

  // Função para o nome do estado
  const getStateName = (stateId) => {
    const state = equipmentState.find(s => s.id === stateId);
    return state ? state.name : 'Unknown';
  };

  // Função para obter a cor relacionada a cada estado
  const getStateColor = (stateId) => {
    const state = equipmentState.find(s => s.id === stateId);
    return state ? state.color : 'Unknown';
  };

  // Função para obter o nome do modelo do equipamento
  const getModelName = (modelId) => {
    const model = equipmentModel.find(m => m.id === modelId);
    return model ? model.name : 'Unknown';
  };

  // Calcular a produtividade diária dos equipamentos
  const calculateDailyProductivity = (states) => {
    const dayInMilliseconds = 24 * 60 * 60 * 1000;
    let productivityByDay = {};

    states.forEach((state, index) => {
      const startDate = new Date(state.date);
      const endDate = states[index + 1] ? new Date(states[index + 1].date) : new Date(startDate.getTime() + dayInMilliseconds);

      const dayKey = startDate.toISOString().split('T')[0];

      if (!productivityByDay[dayKey]) {
        productivityByDay[dayKey] = { totalHours: 0, operatingHours: 0 };
      }

      const durationHours = (endDate - startDate) / (1000 * 60 * 60);

      productivityByDay[dayKey].totalHours += durationHours;

      // Verifique se o estado atual é "Operando" antes de somar as horas de operação
      if (getStateName(state.equipmentStateId) === 'Operando') {
        productivityByDay[dayKey].operatingHours += durationHours;
      }
    });

    // Calcular a porcentagem de produtividade para cada dia
    return Object.entries(productivityByDay).map(([day, { totalHours, operatingHours }]) => {
      const productivityPercentage = totalHours > 0 ? (operatingHours / totalHours) * 100 : 0;
      return { day, productivityPercentage: productivityPercentage.toFixed(2) };
    });
  };

  // Mapeando os equipamentos com suas últimas posições
  const equipmentWithLatestPositions = equipmentPositionHistory.map((equipmentHistory) => {
    const equipmentData = equipment.find(eq => eq.id === equipmentHistory.equipmentId);
    const latestPosition = getLatestPosition(equipmentHistory.positions);
    return {
      id: equipmentHistory.equipmentId,
      name: equipmentData ? equipmentData.name : 'Unknown',
      lat: latestPosition.lat,
      lon: latestPosition.lon
    };
  });

  // Mapeando os equipamentos com seus últimos estados
  const equipmentWithLatestStates = equipmentStateHistory.map((equipmentHistory) => {
    const latestState = getLatestState(equipmentHistory.states);
    return {
      id: equipmentHistory.equipmentId,
      stateId: latestState.equipmentStateId,
    };
  });

  // Mapeia os dados dos equipamentos com suas últimas posições, estados e informações adicionais
  const equipmentData = equipmentWithLatestPositions.map((eq) => {
  // Encontra os dados do estado mais recente para o equipamento atual
  const stateData = equipmentWithLatestStates.find(s => s.id === eq.id);
  
  // Encontra o histórico de estados para o equipamento atual
  const stateHistory = equipmentStateHistory.find(history => history.equipmentId === eq.id);
  
  // Encontra os dados do modelo do equipamento atual
  const equipmentModelData = equipment.find(e => e.id === eq.id);

  return {
    ...eq,
    // Obtém o nome do estado atual, se disponível
    stateName: getStateName(stateData ? stateData.stateId : null),
    // Obtém a cor associada ao estado atual, se disponível
    stateColor: getStateColor(stateData ? stateData.stateId : null),
    // Obtém o nome do modelo do equipamento, se disponível
    modelName: getModelName(equipmentModelData ? equipmentModelData.equipmentModelId : null),
    // Obtém o histórico de estados do equipamento, se disponível
    stateHistory: stateHistory ? stateHistory.states : [],
    // Calcula a produtividade diária com base no histórico de estados, se disponível
    productivity: stateHistory ? calculateDailyProductivity(stateHistory.states) : []
  };
  });

  // Filtra os dados dos equipamentos com base no estado selecionado
  const filteredEquipmentData = selectedState
    ? equipmentData.filter(eq => eq.stateName === getStateName(selectedState))
    : equipmentData;

  // Configuração dos ícones para os marcadores no mapa

  // Ícone verde para equipamentos em estado "Operando"
  const greenEquipmentIcon = new Icon({
    iconUrl: greenIcon,
    iconSize: [45, 41], // Tamanho do ícone
    iconAnchor: [12, 41], // Ponto de ancoragem do ícone
    popupAnchor: [11, -34], // Ponto de ancoragem do popup
    shadowSize: [41, 41], // Tamanho da sombra
  });

  // Ícone vermelho para equipamentos em estado "Manutenção"
  const redEquipmentIcon = new Icon({
    iconUrl: redIcon,
    iconSize: [45, 41],
    iconAnchor: [12, 41],
    popupAnchor: [11, -34],
    shadowSize: [41, 41],
  });

  // Ícone amarelo para equipamentos em estado "Parado"
  const yellowEquipmentIcon = new Icon({
    iconUrl: yellowIcon,
    iconSize: [45, 41],
    iconAnchor: [12, 41],
    popupAnchor: [11, -34],
    shadowSize: [41, 41],
  });

  // Manipula o clique no histórico de estados, abrindo o modal correspondente
  const handleHistoryClick = (history) => {
    setSelectedHistory(history);
    setIsModalOpen(true);
  };

  // Manipula o clique na produtividade, abrindo o modal correspondente
  const handleProductivityClick = (productivity) => {
    setSelectedProductivity(productivity);
    setIsProductivityModalOpen(true);
  };

  // Fecha o modal de produtividade
  const closeProductivityModal = () => {
    setIsProductivityModalOpen(false);
    setSelectedProductivity(null);
  };

  // Fecha o modal de histórico e produtividade
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHistory(null);
    setSelectedProductivity(null);
  };

  return (
    <>
      <h1 className="map-title">Mapa de Equipamentos</h1>

      <Filter
        states={equipmentState}
        selectedState={selectedState}
        onStateChange={setSelectedState}
      />

      <MapContainer center={[-19.126536, -45.947756]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <MarkerClusterGroup>
          {filteredEquipmentData.map(marker => {
            // Definindo o ícone com base no estado
            let equipmentIcon;
            if (marker.stateName === 'Operando') {
              equipmentIcon = greenEquipmentIcon;
            } else if (marker.stateName === 'Manutenção') {
              equipmentIcon = redEquipmentIcon;
            } else {
              equipmentIcon = yellowEquipmentIcon; // Ícone padrão, por exemplo, amarelo
            }

            return (
              <Marker key={marker.id} position={[marker.lat, marker.lon]} icon={equipmentIcon}>
                <Popup>
                  <p className='informacao'><b>Nome:</b> {marker.name}</p>
                  <p className='informacao' style={{ color: marker.stateColor }}> <b>Estado: </b>{marker.stateName}</p>
                  <p className='informacao'><b>Modelo:</b> {marker.modelName}</p>
                  <div className='button-container'>
                    <button className='historicoBtn' onClick={() => handleHistoryClick(marker.stateHistory)}>Histórico de estados</button>
                    <button className='historicoBtn' onClick={() => handleProductivityClick(marker.productivity)}>% de Produtividade</button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Modal para exibir o histórico de estados */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Histórico de Estados"
        className="modal"
      >
        <div className='top'>
          <h2 className='titulo'>Histórico de Estados</h2>
          <button className='btn' onClick={closeModal}>X</button>
        </div>
        {selectedHistory && selectedHistory.length > 0 ? (
          <ul className='historico'>
            {selectedHistory.map((state, index) => (
              <li key={index}>
                <p style={{ color: getStateColor(state.equipmentStateId) }}><b>Estado:</b> {getStateName(state.equipmentStateId)}</p>
                <p><b>Data:</b> {new Date(state.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum histórico disponível.</p>
        )}
      </Modal>

      {/* Modal para exibir a % de produtividade */}
      <Modal
        isOpen={isProductivityModalOpen}
        onRequestClose={closeProductivityModal}
        contentLabel="% de Produtividade"
        className="modal"
      >
        <div className='top'>
          <h2 className='titulo'>Percentual de Produtividade</h2>
          <button className='btn' onClick={closeProductivityModal}>X</button>
        </div>
        {selectedProductivity && selectedProductivity.length > 0 ? (
          <ul className='historico'>
            {selectedProductivity.map((prod, index) => (
              <li key={index}>
                <p><b>Data:</b> {prod.day}</p>
                <p><b>Produtividade:</b> {prod.productivityPercentage}%</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum dado de produtividade disponível.</p>
        )}
      </Modal>
    </>
  );
}

export default App;
