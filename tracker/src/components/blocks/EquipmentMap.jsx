import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import EquipmentMarker from "./EquipmentMarker";
import { Box } from "@chakra-ui/react";

/**
 * EquipmentMap component that renders a map with equipment markers.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.equipments - Array of equipment objects.
 * @param {number} props.equipments[].latitude - Latitude coordinate of the equipment.
 * @param {number} props.equipments[].longitude - Longitude coordinate of the equipment.
 * @param {string} props.equipments[].equipmentId - Unique identifier for the equipment.
 * @returns {JSX.Element}
 */
function EquipmentMap({ equipments }) {
  let center = [0, 0];
  if (equipments.length > 0)
    center = [equipments[0].latitude, equipments[0].longitude];

  return (
    <Box w="100%" h="100%">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {equipments.map((el) => (
          <EquipmentMarker key={el.equipmentId} equipment={el} />
        ))}
      </MapContainer>
    </Box>
  );
}

export default EquipmentMap;
