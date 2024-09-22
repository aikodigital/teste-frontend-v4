import { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import StateHistoryModal from "./StateHistoryModal";
import { useEquipmentContext } from "../context/EquipmentContext";

const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapComponent: React.FC = () => {
  const {
    equipments,
    positions,
    equipmentStates,
    getLatestState,
    getEquipmentStateHistoryData,
  } = useEquipmentContext();

  const [selectedStateHistory, setSelectedStateHistory] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkerClick = useCallback(
    async (equipmentId: string) => {
      const history = await getEquipmentStateHistoryData(equipmentId);
      setSelectedStateHistory(history?.[0]?.states || []);
      setIsModalOpen(true);
    },
    [getEquipmentStateHistoryData]
  );

  return (
    <>
      <MapContainer
        center={[-19.126536, -45.947756]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        {positions.map(({ equipmentId, positions }) => {
          const latestPosition = positions[0];
          const equipment = equipments.find((e) => e.id === equipmentId);
          const latestState = getLatestState(equipmentId);

          return (
            <Marker
              key={equipmentId}
              position={[latestPosition.lat, latestPosition.lon]}
              icon={customIcon}
              eventHandlers={{
                click: () => handleMarkerClick(equipmentId),
              }}
            >
              <Tooltip direction="top" offset={[0, -30]} opacity={1}>
                <p className="text-center text-xl font-bold">
                  {equipment?.name || "Unknown"}
                </p>
                <p
                  className="text-center"
                  style={{ color: latestState?.color || "#000" }}
                >
                  {latestState?.state || "Unknown"}
                </p>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>

      <StateHistoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stateHistory={selectedStateHistory}
        equipmentStates={equipmentStates}
      />
    </>
  );
};

export default MapComponent;
