import L, { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { equipmentPositionHistory, equipmentState, equipmentStateHistory } from "../data";
import { EquipmentPositionHistory } from "../types";

import 'leaflet/dist/leaflet.css';
import iconGreen from '../../public/truck-trailer-green.svg';
import iconRed from '../../public/truck-trailer-red.svg';
import iconYellow from '../../public/truck-trailer-yellow.svg';

interface MapProps {
  equipment: { id: string; name: string; equipmentModelId: string }[];
}

const iconMap = { 
  'a3540227-2f0e-4362-9517-92f41dabbfdf': iconGreen,
  'a4b0c114-acd8-4151-9449-7d12ab9bf40f': iconRed,
  '9c3d009e-0d42-4a6e-9036-193e9bca3199': iconYellow
};

function createIcon(iconUrl: string) {
  return new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

export default function Map({ equipment }: MapProps) {
  const filteredEquipmentPosHistory = equipmentPositionHistory.filter(equipmentPos =>
    equipment.some(e => e.id === equipmentPos.equipmentId)
  );

  const markers = filteredEquipmentPosHistory.map((equipmentPos: EquipmentPositionHistory) => {
    const latestPosition = equipmentPos.positions[equipmentPos.positions.length - 1];
    const equipmentInfo = equipment.find(e => e.id === equipmentPos.equipmentId);
    const equipmentStateInfo = equipmentStateHistory.find(state => state.equipmentId === equipmentPos.equipmentId)?.states;
    const latestState = equipmentState.find(state => state.id === equipmentStateInfo![equipmentStateInfo!.length - 1].equipmentStateId);
    const iconUrl = equipmentInfo && equipmentInfo.equipmentModelId ? iconMap[equipmentInfo.equipmentModelId as keyof typeof iconMap] : "";
    const customIcon = createIcon(iconUrl);

    const position: LatLngExpression = [latestPosition.lat, latestPosition.lon];

    return (
      <Marker key={equipmentPos.equipmentId} position={position} icon={customIcon && customIcon}>
        <Popup>
          <div>
            <h2>{equipmentInfo?.name}</h2>
            <p>Estado: <span style={{ color: latestState?.color }} className='text-blue-500'>{latestState?.name}</span></p>
          </div>
        </Popup>
      </Marker>
    );
  });

  return (
    <MapContainer center={[-19.126536, -45.947756]} zoom={13} style={{ height:"100%", width:"100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers}
    </MapContainer>
  );
}