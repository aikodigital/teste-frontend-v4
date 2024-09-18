import React, { useEffect, useState } from 'react';
import Filtros from '../component/filtros';
import Menu from '../component/menu-Lateral';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import Havester from '../assets/Harvester.png';
import Caminhao from '../assets/caminhao.png';
import Garra from '../assets/garra.png';
import equipmentData from '../../../data/equipment.json';
import equipmentModelData from '../../../data/equipmentModel.json';
import equipmentPositionData from '../../../data/equipmentPositionHistory.json';
import equipmentStateData from '../../../data/equipmentState.json';
import equipmentStateHistory from '../../../data/equipmentStateHistory.json';
import EquipmentHistoryModal from '../component/modal-Historico';
import ModalPosicaoHistorico from '../component/modal-posicao-historico'; // Importando o novo modal
import { orderBydateObject } from '../utils/functions';
import { EquipmentPositionHistoryI, EquipmentViewI } from '../utils/interface';

function Painel() {
  const [mapCenter, setMapCenter] = useState({ lat: -7.11532, lng: -34.861 });
  const [filteredPositions, setFilteredPositions] = useState<EquipmentViewI[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showRouteModal, setShowRouteModal] = useState(false); // Novo estado para o modal de rotas
  const [selectedEquipmentId, setSelectedEquipmentId] =  useState<string | any>(null);
  const [hoveredMarker, setHoveredMarker] = useState<string | any>(null);
  const [filters, setFilters] = useState({ status: '', model: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (equipmentId: string, type: string) => {
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

  const getLatestState = (equipmentId:string) => {
    const history = equipmentStateHistory.find((e) => e.equipmentId === equipmentId);
    if (history && history.states.length > 0) {
      const lastStateId = history.states[history.states.length - 1].equipmentStateId;
      const state = equipmentStateData.find((s) => s.id === lastStateId);
      return state ? {
        name:state.name,
        id: state.id
      } : 'Estado desconhecido';
    }
    return 'Sem histórico de estado';
  };

  const getLatestPositions = () => {
    let list = orderBydateObject(equipmentPositionData)
    return list.map((equipment:EquipmentPositionHistoryI) => {
      const lastPosition = equipment.positions[equipment.positions.length - 1];
      const equipmentInfo = equipmentData.find((e) => e.id === equipment.equipmentId);

      let equipmentModelName = '';
      let icon = '';
      let equipmentName = '';
      if (equipmentInfo) {
        const equipmentModel = equipmentModelData.find((model) => model.id === equipmentInfo.equipmentModelId);
        equipmentModelName = equipmentModel ? equipmentModel.name : 'Modelo desconhecido';
        equipmentName = equipmentInfo.name;
      }

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
        name: equipmentName,
        icon: icon,
        state: getLatestState(equipment.equipmentId),
      };
    });
  };

  const applyFilters = (positions:EquipmentViewI[]) => {
    return positions.filter((position:EquipmentViewI) => {
      const matchStatus = filters.status ? position.state.id.toLowerCase() === filters.status?.toLowerCase() : true;
      const matchModel = filters.model ? position.modelName.toLowerCase() === filters.model.toLowerCase() : true;
      return matchStatus && matchModel;
    });
  };

  const applySearch = (positions:EquipmentViewI[]) => {
    if (!searchQuery) return positions;
    return positions.filter(
      (position:any) =>
        position.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        position.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        position.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  function calcularGanho(equipmentId: string){
    const history = equipmentStateHistory.find((e) => e.equipmentId === equipmentId);
    const equipment = equipmentData.find((e) => e.id === equipmentId);
    if (!history || !equipment) return 0;

    const equipmentModel = equipmentModelData.find((model) => model.id === equipment.equipmentModelId);
    if (!equipmentModel) return 0;

    let totalGanho = 0;
    history.states.forEach((state) => {
      const ganhoPorHora = equipmentModel.hourlyEarnings.find(
        (earning) => earning.equipmentStateId === state.equipmentStateId
      );
      if (ganhoPorHora) {
        totalGanho += ganhoPorHora.value;
      }
    });

    return totalGanho;
  };

  function calcularProdutividade(equipmentId: string){
    const history = equipmentStateHistory.find((e) => e.equipmentId === equipmentId);
    if (!history || history.states.length === 0) return 0;

    const operandoStateId = '0808344c-454b-4c36-89e8-d7687e692d57';
    const totalHoras = history.states.length;
    const horasOperando = history.states.filter((state) => state.equipmentStateId === operandoStateId).length;

    return (horasOperando / totalHoras) * 100;
  };

  useEffect(() => {
    const latestPositions:EquipmentViewI[] = getLatestPositions();
    setMapCenter({ lat: latestPositions[0].lat, lng: latestPositions[0].lon });
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
                {filteredPositions.map((position:EquipmentViewI) => (
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
                  (position:EquipmentViewI) =>
                    hoveredMarker === position.id && (
                      <InfoWindow
                        key={position.id}
                        position={{ lat: position.lat, lng: position.lon }}
                        onCloseClick={() => setHoveredMarker(null)}
                      >
                        <div className="text-center">
                          <h4>{`Equipamento: ${position.modelName}`}</h4>
                          <p>{`Código: ${position.name}`}</p>
                          <p>{`Estado: ${position.state.name}`}</p>
                          <p>{`Percentual: ${(calcularProdutividade(position.id)).toFixed(2)}%`}</p>
                          <p>{`Ganho: R$ ${(calcularGanho(position.id))}`}</p>
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
