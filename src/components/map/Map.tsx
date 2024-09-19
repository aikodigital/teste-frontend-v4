"use client";
import "leaflet/dist/leaflet.css";

import { Equipment } from "@/@types";
import { Icon } from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

type MapProps = {
  equipments: Equipment[];
  handleClickEquipment: (equipment: Equipment) => void;
};

export default function Map({ equipments, handleClickEquipment }: MapProps) {
  const icon = new Icon({
    iconUrl: "/icons/caminhao-de-carga.png",
    iconSize: [24, 24],
  });

  return (
    <MapContainer
      center={[-19.163073, -46.06338]}
      zoom={10}
      scrollWheelZoom={true}
      className="w-full h-full rounded-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {equipments.map(
        (equipment) =>
          equipment.currentPosition && (
            <Marker
              key={equipment.id}
              icon={icon}
              position={[
                equipment.currentPosition.lat,
                equipment.currentPosition.lon,
              ]}
              eventHandlers={{
                click: () => handleClickEquipment(equipment),
              }}
            >
              <Tooltip>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: equipment.currentState?.color }}
                    />
                    {equipment.currentState?.name}
                  </div>
                </div>
              </Tooltip>
            </Marker>
          )
      )}
    </MapContainer>
  );
}
