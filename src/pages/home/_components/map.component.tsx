import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { EquipmentPositionHistory } from "@/types/response.types";

interface IMap {
  equipmentsPosition: EquipmentPositionHistory[];
}

export function Map({ equipmentsPosition }: IMap) {
  const positionDefault: LatLngExpression = [-19.264235, -46.092436];

  return (
    <MapContainer center={positionDefault} zoom={13} zoomControl={false}>
      <ZoomControl position="topright" />
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {equipmentsPosition.map((equipment, eqIndex) => {
        // Verificando se equipment.positions é um array e tem elementos
        if (!equipment.positions || !Array.isArray(equipment.positions)) {
          console.error(
            `positions de equipment ${eqIndex} não é um array ou está indefinido`
          );
          return null;
        }

        return equipment.positions.map((position, posIndex) => (
          <Marker
            key={`${eqIndex}-${posIndex}`}
            position={[position.lat, position.lon]}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ));
      })}
    </MapContainer>
  );
}
