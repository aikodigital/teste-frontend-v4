import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEquipment } from '../hooks/useEquipment';
import { useEffect, useState, useMemo, FC } from 'react';

// Import components
import MapAdjuster from './map/MapAdjuster';
import TimeControls from './map/TimeControls';
import EquipmentMarker from './map/EquipmentMarker';
import { EquipmentDataItem, StateColor, EquipmentType } from './map/types';

// Import all icons from barrel file
import icons from '../assets/icons';

// Import equipment states
import equipmentStates from '../../data/equipmentState.json';

const Map: FC = () => {
  // Obtém dados e funções do contexto global de equipamentos
  const {
    filteredEquipment,
    equipmentModels,
    getEquipmentName,
    selectedDate,
    advanceTime, // Controla a navegação temporal no mapa
    jumpToTime,
    getEquipmentStateAtDate,
    getEquipmentPositionAtDate,
    openEquipmentHistory,
    loading,
    error
  } = useEquipment();
  
  // Armazena os dados processados dos equipamentos para renderização no mapa
  const [equipmentData, setEquipmentData] = useState<EquipmentDataItem[]>([]);

  // Formata a data para o padrão brasileiro
  const formatDate = (date: Date): string => {
    return date.toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Determina a cor do ícone baseado no estado do equipamento
  // Verde = operando, Amarelo = parado, Vermelho = manutenção
  const getStateColor = (stateId?: string): StateColor => {
    if (!stateId) return 'green';
    
    const stateInfo = equipmentStates.find(state => state.id === stateId);
    if (!stateInfo) return 'green';
    
    if (stateInfo.name === 'Parado') return 'yellow';
    if (stateInfo.name === 'Manutenção') return 'red';
    return 'green';
  };

  // Mapeia o nome do modelo para um tipo de equipamento para selecionar o ícone correto
  const getEquipmentType = (modelName: string): EquipmentType => {
    const model = modelName.toLowerCase();
    
    if (model.includes('caminhão')) return 'truck';
    if (model.includes('harvester')) return 'tractor';
    if (model.includes('garra')) return 'excavator';
    
    return 'truck'; // Fallback para evitar erros de renderização
  };

  // Cria o ícone Leaflet apropriado baseado no tipo e estado do equipamento
  const getIcon = (modelName: string, stateId?: string): L.Icon => {
    const stateColor = getStateColor(stateId);
    const equipmentType = getEquipmentType(modelName);
    
    // Usa a estrutura do barrel file para acessar o ícone correto
    const iconUrl = icons[equipmentType][stateColor];
    
    return new L.Icon({
      iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 16], // Centraliza o ícone na posição exata do equipamento
      popupAnchor: [0, -16] // Posiciona o tooltip acima do ícone
    });
  };

  // Converte o ID do estado para um nome legível para o usuário
  const getStateName = (stateId?: string): string => {
    if (!stateId) return 'Desconhecido';
    
    const stateInfo = equipmentStates.find(state => state.id === stateId);
    return stateInfo ? stateInfo.name : 'Desconhecido';
  };

  // Processa os dados brutos dos equipamentos para o formato necessário para renderização
  // Usa memoização para evitar recálculos desnecessários quando outros estados mudam
  const processedEquipmentData = useMemo(() => {
    if (loading || error) return [];
    
    return filteredEquipment
      .map(eq => {
        const model = equipmentModels.find(m => m.id === eq.equipmentModelId);
        // Obtém a posição e estado do equipamento na data/hora selecionada
        const position = getEquipmentPositionAtDate(eq.id, selectedDate);
        const stateId = getEquipmentStateAtDate(eq.id, selectedDate);
        
        return {
          id: eq.id,
          model: model?.name || 'unknown',
          position,
          state: { equipmentStateId: stateId }
        };
      })
      // Remove equipamentos sem posição para evitar erros de renderização
      .filter(item => item.position !== null);
  }, [
    filteredEquipment, 
    equipmentModels, 
    selectedDate, 
    getEquipmentPositionAtDate, 
    getEquipmentStateAtDate, 
    loading, 
    error
  ]);
  
  // Atualiza o estado local quando os dados processados mudam
  // Separado do useMemo para seguir o padrão de fluxo de dados unidirecional
  useEffect(() => {
    setEquipmentData(processedEquipmentData);
  }, [processedEquipmentData]);

  return (
    <div className="relative h-full">
      <h2 className="text-sm font-medium text-gray-600 mb-3 " >Mapa de Rastreamento</h2>
      
      {/* Controles de tempo posicionados acima do mapa para fácil acesso */}
      <TimeControls 
        selectedDate={selectedDate}
        advanceTime={advanceTime}
        jumpToTime={jumpToTime}
        formatDate={formatDate}
      />
      
      {/* Container com altura e largura relativas para se adaptar ao layout responsivo */}
      <div className='relative h-full w-full'> 
        <MapContainer
          center={[-19.2, -46]} // Coordenadas iniciais centradas na área de operação
          zoom={12}
          className="h-full w-full"
          style={{ height: '100%', width: '100%' }}
        >
          {/* Ajusta o mapa quando o tamanho da janela muda */}
          <MapAdjuster />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Renderiza os marcadores de equipamento na posição correta */}
          {equipmentData.map(item => (
            <EquipmentMarker
              key={item.id}
              item={item}
              getIcon={getIcon}
              getEquipmentName={getEquipmentName}
              getStateName={getStateName}
              openEquipmentHistory={openEquipmentHistory}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
