import { FC } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

// Tipos que permitem posição nula para equipamentos fora do mapa
type EquipmentPosition = [number, number] | null;
type EquipmentState = { equipmentStateId?: string };

interface EquipmentDataItem {
  id: string;
  model: string;
  position: EquipmentPosition;
  state: EquipmentState;
}

interface EquipmentMarkerProps {
  item: EquipmentDataItem;
  // Função para obter ícones personalizados baseados no modelo e estado
  getIcon: (modelName: string, stateId?: string) => L.Icon;
  // Funções para obter dados formatados para exibição no tooltip
  getEquipmentName: (id: string) => string;
  getStateName: (stateId?: string) => string;
  // Callback para abrir o histórico ao clicar no marcador
  openEquipmentHistory: (id: string) => void;
}

const EquipmentMarker: FC<EquipmentMarkerProps> = ({
  item,
  getIcon,
  getEquipmentName,
  getStateName,
  openEquipmentHistory
}) => {
  // Evita renderização de equipamentos sem posição definida
  if (!item.position) return null;
  
  return (
    <Marker
      key={item.id}
      position={item.position}
      icon={getIcon(item.model, item.state?.equipmentStateId)}
      eventHandlers={{
        click: () => openEquipmentHistory(item.id)
      }}
    >
      <Tooltip 
        direction="top" 
        // Offset para posicionar o tooltip acima do ícone sem sobreposição
        offset={[0, -32]} 
        opacity={0.9} 
        permanent={false} 
        className="custom-tooltip"
      >
        <div className="text-base p-2 min-w-[150px]">
          <p className="font-bold text-xl">{getEquipmentName(item.id)}</p>
          <p className="text-lg mt-1">
            <strong>Modelo:</strong> {item.model}
          </p>
          <p className="text-lg mt-1">
            <strong>Status:</strong> {getStateName(item.state?.equipmentStateId)}
          </p>
        </div>
      </Tooltip>
    </Marker>
  );
};

export default EquipmentMarker;