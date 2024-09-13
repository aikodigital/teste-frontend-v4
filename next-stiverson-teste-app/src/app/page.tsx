import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useEquipment } from './hooks/useEquipment';


const Map = dynamic(() => import('./components/Map'), { ssr: false });

interface PositionData {
  equipmentId: string;
  positions: {
    date: string;
    lat: number;
    lon: number;
  }[];
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface EquipmentStateHistory {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}

interface Equipment {
  id: string;
  name: string;
  lat: number;
  lon: number;
  state: string;
  color: string;
}

export default function Home() {
  const { 
    equipmentData, 
    positionData, 
    equipmentState, 
    equipmentStateHistory, 
    isLoadingEquipments, 
    isLoadingPositions, 
    isLoadingStates, 
    isLoadingStateHistory 
  } = useEquipment();

  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  useEffect(() => {
    if (
      equipmentData && 
      positionData && 
      equipmentState && 
      equipmentStateHistory
    ) {
      const formattedEquipment = equipmentData.map((equipment: Equipment) => {
        const positionHistory = positionData.find((pos: PositionData) => pos.equipmentId === equipment.id);
        const stateHistory = equipmentStateHistory.find((state: EquipmentStateHistory) => state.equipmentId === equipment.id);
        
        if (
          positionHistory && 
          positionHistory.positions.length > 0 && 
          stateHistory && 
          stateHistory.states.length > 0
        ) {
          const latestPosition = positionHistory.positions.slice(-1)[0];
          const latestState = stateHistory.states.slice(-1)[0];
          const state = equipmentState.find((st: EquipmentState) => st.id === latestState.equipmentStateId);

          // Se o estado não for encontrado, retorna null
          if (state) {
            return {
              id: equipment.id,
              name: equipment.name,
              lat: latestPosition.lat,
              lon: latestPosition.lon,
              state: state.name,
              color: state.color,
            };
          }
        }
        return null; // Retorna null caso não encontre dados válidos
      }).filter((item): item is Equipment => item !== null); // Remove itens null e assegura que é do tipo Equipment

      setEquipmentList(formattedEquipment);
    }
  }, [equipmentData, positionData, equipmentState, equipmentStateHistory]);

  // Verifica se algum dado está carregando
  if (isLoadingEquipments || isLoadingPositions || isLoadingStates || isLoadingStateHistory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Equipment Dashboard</h1>
      <Map equipmentList={equipmentList} />
    </div>
  );
}
