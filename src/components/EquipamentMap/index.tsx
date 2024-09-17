import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import customIconUrl from '../../assets/local.png';
import './styles.scss';

interface Position {
  date: string;
  lat: number;
  lon: number;
  equipmentStateId?: string;
  equipmentId: string;
}

interface StateType {
  id: string;
  name: string;
  color: string;
}

interface EquipmentMapProps {
  positions: Position[];
  stateTypes: StateType[];
  onEquipmentClick: (equipmentId: string) => void;
  equipment: { id: string; equipmentModelId: string; name: string }[];
  equipmentModel: { id: string; name: string }[];
}

const EquipmentMap: React.FC<EquipmentMapProps> = ({
  positions,
  stateTypes,
  onEquipmentClick,
  equipment,
  equipmentModel
}) => {
  const defaultCenter: LatLngExpression = [-19.1099, -45.9292];
  const center: LatLngExpression = positions.length > 0
    ? [positions[0].lat, positions[0].lon]
    : defaultCenter;

  const customIcon = new L.Icon({
    iconUrl: customIconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const getEquipmentName = (equipmentId: string) => {
    const equipmentItem = equipment.find(e => e.id === equipmentId);
    if (equipmentItem) {
      const model = equipmentModel.find(model => model.id === equipmentItem.equipmentModelId);
      return model ? model.name : 'Nome do modelo desconhecido';
    }

    return 'Nome desconhecido';
  };

  return (
    <MapContainer center={center} zoom={13} className='MapContainer'>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {positions.length > 0 ? (
        positions.map((position, index) => {
          const stateInfo = stateTypes.find(s => s.id === position.equipmentStateId);
          const equipmentName = getEquipmentName(position.equipmentId);

          return (
            <Marker
              key={index}
              position={[position.lat, position.lon]}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  onEquipmentClick(position.equipmentId);
                }
              }}
            >
              <Popup>
                <strong>Equipamento: {equipmentName}</strong> <br />
                Data: {new Date(position.date).toLocaleString()} <br />
                Estado: {stateInfo ? stateInfo.name : 'Desconhecido'} <br />
                Cor: <div style={{ display: 'inline-flex', backgroundColor: stateInfo?.color, width: '15px', height: '15px', borderRadius: '9px' }}></div>
              </Popup>
            </Marker>
          );
        })
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Não há posições para exibir.</p>
        </div>
      )}
    </MapContainer>
  );
};

export default EquipmentMap;