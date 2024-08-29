import { LatLngExpression } from "leaflet";
import { equipmentPositionHistory, equipmentState, equipmentStateHistory } from "../data";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

interface EquipmentHistoryMApProps {
  equipmentId: string;
}

export default function EquipmentHistoryMap({ equipmentId } : EquipmentHistoryMApProps) {
  const equipmentPosHistory = equipmentPositionHistory.find((pos) => pos.equipmentId === equipmentId);
  const equipmentStateHist = equipmentStateHistory.find((state) => state.equipmentId === equipmentId);

  if(!equipmentPosHistory || !equipmentStateHist) {
    return <p>Histórico não disponível para este equipamento.</p>;
  }

  const positions: LatLngExpression[] = equipmentPosHistory.positions.map((position) => [position.lat, position.lon]);

  const markers = equipmentPosHistory.positions.map((position, index) => {
    const stateId = equipmentStateHist.states[index].equipmentStateId;
    const equipmentStateInfo = equipmentState.find((state) => state.id === stateId);

    return (
      <Marker key={index} position={[position.lat, position.lon]}>
        <Popup>
          <div>
            <p>Data: {new Date(position.date).toLocaleDateString()}</p>
            <p>Estado: <span style={{ color: equipmentStateInfo?.color}}>{equipmentStateInfo?.name}</span></p>
          </div>
        </Popup>
      </Marker>
    );
  });

  return (
    <div className="w-full h-full">
      <MapContainer center={positions[0]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers}
        <Polyline positions={positions} color="blue" />
      </MapContainer>
    </div>
  )
}