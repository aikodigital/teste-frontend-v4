import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getEquipmentPositions, getEquipmentStateHistory, getEquipmentStates, getEquipment, getEquipmentModels } from '../services/equipmentService';
import EquipmentMarker from './EquipmentMarker';
import PositionHistoryModal from './PositionHistoryModal';
import StateHistoryModal from './StateHistoryModal';
import { createCustomIcon } from '../services/customIcon';
import Sidebar from './Sidebar';
import { FiMenu } from 'react-icons/fi';

const Map: React.FC = () => {
  const initialPosition: [number, number] = [-19.126536, -45.947756];
  const [equipmentPositions, setEquipmentPositions] = useState<any[]>([]);
  const [equipmentStates, setEquipmentStates] = useState<any[]>([]);
  const [equipmentStateHistory, setEquipmentStateHistory] = useState<any[]>([]);
  const [equipmentModels, setEquipmentModels] = useState<any[]>([]);
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [selectedEquipmentHistory, setSelectedEquipmentHistory] = useState<any[]>([]);
  const [selectedEquipmentPositions, setSelectedEquipmentPositions] = useState<any[]>([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Controle do Sidebar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positions = await getEquipmentPositions();
        const equipments = await getEquipment();
        const models = await getEquipmentModels();
        const combinedData = positions.map((position) => {
          const equipment = equipments.find((eq: any) => eq.id === position.equipmentId);
          return {
            ...position,
            equipmentModelId: equipment ? equipment.equipmentModelId : '',
          };
        });

        setEquipmentPositions(combinedData);
        setEquipmentStates(await getEquipmentStates());
        setEquipmentStateHistory(await getEquipmentStateHistory());
        setEquipmentModels(models);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const getLastState = (equipmentId: string) => {
    const equipmentHistory = equipmentStateHistory.find((eq) => eq.equipmentId === equipmentId);
    if (equipmentHistory) {
      const lastStateId = equipmentHistory.states[equipmentHistory.states.length - 1]?.equipmentStateId;
      return equipmentStates.find((state) => state.id === lastStateId) || { name: 'Desconhecido', color: '#000' };
    }
    return { name: 'Desconhecido', color: '#000' };
  };

  const handleMarkerClick = (equipmentId: string) => {
    const equipmentHistory = equipmentStateHistory.find((eq) => eq.equipmentId === equipmentId);
    const equipment = equipmentPositions.find((eq) => eq.equipmentId === equipmentId);

    if (equipmentHistory && equipment) {
      setSelectedEquipmentHistory(equipmentHistory.states);
      setSelectedEquipmentPositions(equipment.positions);
      setSelectedEquipmentId(equipment.equipmentId);
      setSidebarOpen(true); // Abre o sidebar ao clicar em um marcador
    }
  };

  return (
    <>
      <div className="flex h-screen"> {/* Garantir layout flex para desktop */}
        {/* Sidebar */}
        <Sidebar
          selectedEquipmentId={selectedEquipmentId}
          openStateModal={() => setIsStateModalOpen(true)}
          openPositionModal={() => setIsPositionModalOpen(true)}
          closeSidebar={() => setSidebarOpen(false)}
          isOpen={sidebarOpen} // Passando o estado de abertura do sidebar
        />

        <div className="relative flex-grow"> {/* Conteúdo do Mapa */}
          <MapContainer center={initialPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {equipmentPositions.map((equipment) => {
              const lastState = getLastState(equipment.equipmentId);

              const equipmentModel = equipmentModels.find(
                (model) => model.id === equipment.equipmentModelId
              )?.name || 'Modelo desconhecido';

              const customIcon = createCustomIcon(lastState.color);

              return (
                <EquipmentMarker
                  key={equipment.equipmentId}
                  equipment={equipment}
                  lastState={lastState}
                  equipmentModel={equipmentModel}
                  handleMarkerClick={handleMarkerClick}
                  icon={customIcon}
                />
              );
            })}
          </MapContainer>

    
          <button
            className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu className="text-2xl" />
          </button>
        </div>


        <PositionHistoryModal
          isOpen={isPositionModalOpen}
          onRequestClose={() => setIsPositionModalOpen(false)}
          selectedEquipmentPositions={selectedEquipmentPositions}
        />


        <StateHistoryModal
          isOpen={isStateModalOpen}
          onRequestClose={() => setIsStateModalOpen(false)}
          selectedEquipmentHistory={selectedEquipmentHistory}
          equipmentStates={equipmentStates}
        />
      </div>
    </>
  );
};

export default Map;
