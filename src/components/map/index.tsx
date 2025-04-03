import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Container } from "./styles";
import { Tooltip } from "react-leaflet";

interface EquipmentPosition {
  id: string;
  name: string;
  lat: number;
  lon: number;
  lastState: {
    stateName: string;
    stateColor: string;
    date: string | null;
  }
}

interface MapProps {
  equipmentPositions: EquipmentPosition[];
}

export function Map({ equipmentPositions }: MapProps) {
  return (
    <Container>
      <MapContainer center={[-19.172475, -46.080028]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {equipmentPositions.map((equipment) => (
          <Marker key={equipment.id} position={[equipment.lat, equipment.lon]}>
            <Tooltip>
              <strong>{equipment.name}</strong>
              <br />
              <span style={{ color: equipment.lastState.stateColor }}>
                {equipment.lastState.stateName}
              </span>
            </Tooltip>
            <Popup>
              <strong>{equipment.name}</strong>
              <br />
              <span>
                <strong>Estado:</strong>{" "}
                <span style={{ color: equipment.lastState.stateColor }}>
                  {equipment.lastState.stateName}
                </span>
              </span>
              <br />
              <span>
                <strong>Data:</strong>{" "}
                {equipment.lastState.date
                  ? new Date(equipment.lastState.date).toLocaleString()
                  : "Sem Data"}
              </span>
              <br />
              <span>
                <strong>Latitude:</strong> {equipment.lat}
              </span>
              <br />
              <span>
                <strong>Longitude:</strong> {equipment.lon}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  );
}