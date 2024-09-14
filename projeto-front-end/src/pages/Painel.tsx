import React, { useEffect, useState } from 'react';
import Filtros from '../component/Filtros';
import Menu from '../component/Menu-Lateral';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import Havester from '../assets/Harvester.png';
import Caminhao from '../assets/Caminhão de carga.png';
import Garra from '../assets/Garra traçadora.png';
import equipmentData from '../../../data/equipment.json';
import equipmentModelData from '../../../data/equipmentModel.json';
import equipmentPositionData from '../../../data/equipmentPositionHistory.json';
import equipmentStateData from '../../../data/equipmentState.json';
import equipmentStateHistory from '../../../data/equipmentStateHistory.json';
import EquipmentHistoryModal from '../component/modal-Historico';

function Painel() {
  const [mapCenter, setMapCenter] = useState({lat: -7.11532, lng: -34.861 })
  const [positions, setPositions] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null); // Armazena o ID do equipamento selecionado para o modal

  const openModal = (equipmentId:any) => {
    setSelectedEquipmentId(equipmentId); // Define o equipamento atual
    setShowModal(true); // Exibe o modal
  };

  const closeModal = () => {
    setShowModal(false); // Fecha o modal
    setSelectedEquipmentId(null); // Limpa o equipamento selecionado
  };
  const [hoveredMarker, setHoveredMarker] = useState(null); // Armazena o marcador sobre o qual o mouse está

  // Função para obter o estado mais recente de um equipamento
  const getLatestState = (equipmentId:any) => {
    const history = equipmentStateHistory.find((e) => e.equipmentId === equipmentId);
    if (history && history.states.length > 0) {
      const lastStateId = history.states[history.states.length - 1].equipmentStateId;
      const state = equipmentStateData.find((s) => s.id === lastStateId);
      return state ? state.name : 'Estado desconhecido';
    }
    return 'Sem histórico de estado';
  };

  const getLatestPositions = () => {
    return equipmentPositionData.map((equipment) => {
      const lastPosition = equipment.positions[equipment.positions.length - 1];
      const equipmentInfo = equipmentData.find((e) => e.id === equipment.equipmentId);

      let equipmentModelName = '';
      let icon = '';
      if (equipmentInfo) {
        const equipmentModel = equipmentModelData.find((model) => model.id === equipmentInfo.equipmentModelId);
        equipmentModelName = equipmentModel ? equipmentModel.name : 'Modelo desconhecido';
      }

      // Define o ícone correto para o modelo do equipamento
      if (equipmentModelName === 'Havester') {
        icon = Havester;
      } else if (equipmentModelName === 'Garra traçadora') {
        icon = Garra;
      } else if (equipmentModelName === 'Caminhão de carga') {
        icon = Caminhao;
      }

      return {
        id: equipment.equipmentId,
        lat: lastPosition.lat,
        lon: lastPosition.lon,
        modelName: equipmentModelName,
        icon: icon, // Ícone baseado no modelo
        state: getLatestState(equipment.equipmentId) // Estado mais recente
      };
    });
  };

  useEffect(() => {
    const latestPositions:any = getLatestPositions();
    setMapCenter({'lat': latestPositions[0].lat, 'lng':latestPositions[0].lon})
        setPositions(latestPositions);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg, #e0f2ff 0%, #a0c4ff 100%)' }}>
      <Menu />

      <div className="flex flex-col w-full h-full">
        <div className="absolute top-0 left-16 right-0 p-4 flex justify-between items-center z-10">
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-white rounded-full shadow-md text-black font-bold">STATUS</button>
            <button className="px-6 py-2 bg-white rounded-full shadow-md text-black font-bold">Modelos</button>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Pesquisar"
              className="px-4 py-2 bg-white rounded-full shadow-md text-black outline-none"
            />
          </div>
        </div>
        <EquipmentHistoryModal
          equipmentId={selectedEquipmentId}
          show={showModal}
          onClose={closeModal}
        />

        <div className="flex-grow w-full h-full relative p-8 flex justify-center items-center">
          <div className="w-11/12 h-5/6 rounded-3xl shadow-lg overflow-hidden">
            <APIProvider apiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <Map
                defaultCenter={{ lat: mapCenter.lat, lng:mapCenter.lng }}
                defaultZoom={5}
                minZoom={2}
                maxZoom={22}
                style={{ width: '100%', height: '100%', borderRadius: '24px' }}
              >
                {positions.map((position:any) => (
                  <Marker
                    key={position.id}
                    position={{ lat: position.lat, lng: position.lon }}
                    icon={{
                      url: position.icon, // Ícone personalizado para o marcador
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    onClick={() => setHoveredMarker(position.id)} // Exibe o InfoWindow ao passar o mouse
                   // Esconde o InfoWindow quando o mouse sair
                  />
                ))}

                {/* Exibir InfoWindow ao passar o mouse sobre o marcador */}
                {positions.map((position:any) => (
                  hoveredMarker === position.id && (
                    <InfoWindow
                      key={position.id}
                      position={{ lat: position.lat, lng: position.lon }}
                      onCloseClick={() => setHoveredMarker(null)} // Fechar o InfoWindow
                    >
                      <div>
                        <h4>{`Equipamento: ${position.modelName}`}</h4>
                        <p>{`Estado: ${position.state}`}</p>
                        <p>{`Última posição: ${position.lat.toFixed(5)}, ${position.lon.toFixed(5)}`}</p>
                      </div>
                      <button onClick={() => openModal(position.id)}>Ver Histórico</button>
                    </InfoWindow>
                  )
                ))}
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Painel;
