import React from "react";

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import DetailCard from "./DetailCard";

/**
 * EquipmentPositions component that renders a map displaying the equipment's historical positions.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data object containing equipment positioning details.
 * @param {number} props.data.latitude - The current latitude of the equipment, used to center the map.
 * @param {number} props.data.longitude - The current longitude of the equipment, used to center the map.
 * @param {Array<Object>} props.data.historyPositions - An array of historical position objects.
 * @param {number} props.data.historyPositions[].lat - The latitude of a historical position.
 * @param {number} props.data.historyPositions[].lon - The longitude of a historical position.
 * @param {string} props.data.historyPositions[].date - The date associated with the historical position.
 * @returns {JSX.Element}
 */
function EquipmentPositions({ data }) {
  return (
    <DetailCard title="Posições">
      <MapContainer
        center={[data.latitude, data.longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {data.historyPositions.map((el, index) => (
          <Marker key={index} position={[el.lat, el.lon]}>
            <Tooltip>{el.date}</Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </DetailCard>
  );
}

export default EquipmentPositions;
