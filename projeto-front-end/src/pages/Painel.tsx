import React, { useEffect, useState } from 'react';
import Filtros from '../component/filtros';
import Menu from '../component/menu-Lateral';
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
import ModalPosicaoHistorico from '../component/modal-posicao-historico'; // Importando o novo modal
import { orderBydate, orderBydateObject } from '../utils/functions';

function Painel() {
  const [mapCenter, setMapCenter] = useState({ lat: -7.11532, lng: -34.861 });
  const [positions, setPositions] = useState([]);
  const [filteredPositions, setFilteredPositions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false); // Novo estado para o modal de rotas
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [filters, setFilters] = useState({ status: '', model: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (equipmentId: any, type: string) => {
    setSelectedEquipmentId(equipmentId);
    if (type === 'historico') {
      setShowModal(true);
    } else if (type === 'rotas') {
      setShowRouteModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEquipmentId(null);
  };

  const closeRouteModal = () => {
    setShowRouteModal(false);
    setSelectedEquipmentId(null);
  };

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
    let list = orderBydateObject(equipmentPositionData)
    return list.map((equipment) => {
      const lastPosition = equipment.positions[equipment.positions.length - 1];
      const equipmentInfo = equipmentData.find((e) => e.id === equipment.equipmentId);

      let equipmentModelName = '';
      let icon = '';
      let equipmentName = '';
      if (equipmentInfo) {
        const equipmentModel = equipmentModelData.find((model) => model.id === equipmentInfo.equipmentModelId);
        equipmentModelName = equipmentModel ? equipmentModel.name : 'Modelo desconhecido';
        equipmentName = equipmentInfo.name; // Pegue o nome do equipamento
      }

      // Define o ícone correto para o modelo do equipamento
      if (equipmentModelName === 'Harvester') {
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
        name: equipmentName, // Adicione o nome do equipamento
        icon: icon,
        state: getLatestState(equipment.equipmentId),
      };
    });
  };

  const applyFilters = (positions:any) => {
    return positions.filter((position:any) => {
      const matchStatus = filters.status ? position.state.toLowerCase() === filters.status.toLowerCase() : true;
      const matchModel = filters.model ? position.modelName.toLowerCase() === filters.model.toLowerCase() : true;
      return matchStatus && matchModel;
    });
  };

  const applySearch = (positions:any) => {
    if (!searchQuery) return positions;
    return positions.filter(
      (position:any) =>
        position.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        position.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        position.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const latestPositions:any = getLatestPositions();
    setMapCenter({ lat: latestPositions[0].lat, lng: latestPositions[0].lon });
    setPositions(latestPositions);
    setFilteredPositions(applySearch(applyFilters(latestPositions)));
  }, [filters, searchQuery]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="hidden md:block z-20 relative">
        <Menu />
      </div>

      <div className="flex flex-col w-full h-full justify-center">
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-center z-10 md:justify-start md:left-16 w-full">
          <div className="w-full md:max-w-8xl md:text-lg md:space-x-28">
            <Filtros
              onFilterChange={(newFilters:any) => setFilters(newFilters)}
              onSearch={(query:any) => setSearchQuery(query)}
            />
          </div>
        </div>

        <EquipmentHistoryModal equipmentId={selectedEquipmentId} show={showModal} onClose={closeModal} />
        <ModalPosicaoHistorico equipmentId={selectedEquipmentId} show={showRouteModal} onClose={closeRouteModal} />

        <div className="flex-grow w-full h-full relative p-8 flex justify-center items-center transition-all duration-300">
          <div className="w-full md:w-11/12 h-5/6 rounded-3xl shadow-2xl overflow-hidden">
            <APIProvider apiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <Map
                defaultCenter={{ lat: mapCenter.lat, lng: mapCenter.lng }}
                defaultZoom={5}
                minZoom={2}
                maxZoom={22}
                style={{ width: '100%', height: '100%', borderRadius: '24px' }}
              >
                {filteredPositions.map((position:any) => (
                  <Marker
                    key={position.id}
                    position={{ lat: position.lat, lng: position.lon }}
                    icon={{
                      url: position.icon,
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    onClick={() => setHoveredMarker(position.id)}
                  />
                ))}

                {filteredPositions.map(
                  (position:any) =>
                    hoveredMarker === position.id && (
                      <InfoWindow
                        key={position.id}
                        position={{ lat: position.lat, lng: position.lon }}
                        onCloseClick={() => setHoveredMarker(null)}
                      >
                        <div className="text-center">
                          <h4>{`Equipamento: ${position.modelName}`}</h4>
                          <p>{`Código: ${position.name}`}</p>
                          <p>{`Estado: ${position.state}`}</p>
                          <p>{`Última posição: ${position.lat.toFixed(5)}, ${position.lon.toFixed(5)}`}</p>
                          <button
                            className="bg-sky-900 text-white font-bold py-2 px-6 rounded-full mt-2"
                            onClick={() => openModal(position.id, 'historico')}
                          >
                            Ver Histórico
                          </button>
                          <button
                            className="bg-sky-900 text-white font-bold py-2 px-6 rounded-full mt-2"
                            onClick={() => openModal(position.id, 'rotas')}
                          >
                            Ver Rotas
                          </button>
                        </div>
                      </InfoWindow>
                    )
                )}
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Painel;
