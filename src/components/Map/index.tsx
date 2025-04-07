import React from "react";
import { MapContainer, Polyline, TileLayer, CircleMarker } from "react-leaflet";
import EquipmentMarker from "./Marker";
import { Equipment } from "../../types/equipment";
import "leaflet/dist/leaflet.css";

type MapProps = {
  equipments: Equipment[];
  selectedEquipment: Equipment | null;
  onSelect: (equipment: Equipment) => void;
  activePathStartIndex: number | null;
};

const Map: React.FC<MapProps> = ({
  equipments,
  selectedEquipment,
  onSelect,
  activePathStartIndex,
}) => {
  return (
    <MapContainer
      center={[-19, -46]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {equipments.map((equipment) => (
        <EquipmentMarker
          key={equipment.id}
          equipment={equipment}
          isSelected={selectedEquipment?.id === equipment.id}
          selectedEquipment={selectedEquipment}
          onSelect={onSelect}
        />
      ))}
      {selectedEquipment &&
        activePathStartIndex !== null &&
        selectedEquipment.positionHistory
          .slice(activePathStartIndex)
          .map((pos, idx, arr) => {
            if (idx === arr.length - 1) return null; // não tem "próximo"
            const current = arr[idx];
            const next = arr[idx + 1];
            return (
              <Polyline
                key={`line-${idx}`}
                positions={[
                  [current.lat, current.lon],
                  [next.lat, next.lon],
                ]}
                pathOptions={{
                  color: "#666",
                  weight: 2,
                  dashArray: "4 4",
                }}
              />
            );
          })}
      {selectedEquipment &&
        activePathStartIndex !== null &&
        selectedEquipment.positionHistory
          .slice(activePathStartIndex)
          .map((pos, idx) => (
            <CircleMarker
              key={activePathStartIndex + idx}
              center={[pos.lat, pos.lon]}
              radius={4}
              pathOptions={{
                color: "gray", // depois você pode trocar por base no status
                fillColor: "gray",
                fillOpacity: 0.6,
              }}
            />
          ))}
    </MapContainer>
  );
};

export default Map;
