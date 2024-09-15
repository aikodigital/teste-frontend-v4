import React, { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple, Icon, DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { styled } from "@mui/material/styles";
import MapLegend from "./MapLegend";
import StateHistoryModal from "./StateHistoryModal";
import { Equipment, EquipmentState } from "../types/sharedTypes";

import tracerClawIcon from "../assets/tracerClaw.svg";
import harvesterIcon from "../assets/harvester.svg";
import truckIcon from "../assets/truck.svg";

const StyledMapContainer = styled(MapContainer)({
  height: "100%",
  width: "100%",
});

interface EquipmentMapProps {
  equipments: Equipment[];
  equipmentStates: EquipmentState[];
}

const EquipmentMap: React.FC<EquipmentMapProps> = ({
  equipments,
  equipmentStates,
}) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const center: LatLngTuple = [-19.2, -45.9];

  const getIconForEquipment = (equipment: Equipment) => {
    let iconUrl;
    switch (equipment.model) {
      case "Garra traçadora":
        iconUrl = tracerClawIcon;
        break;
      case "Harvester":
        iconUrl = harvesterIcon;
        break;
      case "Caminhão de carga":
        iconUrl = truckIcon;
        break;
      default:
        return new Icon.Default();
    }

    const state = equipmentStates.find(
      (s) => s.id === equipment.latestState?.id,
    );
    const color = state ? state.color : "#f1c40f";

    return new DivIcon({
      className: "custom-icon",
      html: `
        <div style="
          width: 32px; 
          height: 32px; 
          background-image: url(${iconUrl}); 
          background-size: cover;
          filter: drop-shadow(0 0 3px ${color}) drop-shadow(0 0 3px ${color});
        "></div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  const equipmentTypes = useMemo(
    () => [
      { name: "Garra traçadora", icon: tracerClawIcon },
      { name: "Harvester", icon: harvesterIcon },
      { name: "Caminhão de carga", icon: truckIcon },
    ],
    [],
  );

  const handleEquipmentClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEquipment(null);
  };

  const getStateHistory = (equipment: Equipment) => {
    if (!equipment.stateHistory || !Array.isArray(equipment.stateHistory)) {
      return [];
    }
    return equipment.stateHistory.map((history) => {
      const state = equipmentStates.find(
        (s) => s.id === history.equipmentStateId,
      );
      return {
        date: history.date,
        stateName: state ? state.name : "Desconhecido",
        stateColor: state ? state.color : "#000000",
      };
    });
  };

  return (
    <>
      <StyledMapContainer center={center} zoom={9}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {equipments.map((equipment) => {
          if (equipment.latestPosition) {
            return (
              <Marker
                key={equipment.id}
                position={[
                  equipment.latestPosition.lat,
                  equipment.latestPosition.lon,
                ]}
                icon={getIconForEquipment(equipment)}
                eventHandlers={{
                  click: () => handleEquipmentClick(equipment),
                }}
              >
                <Popup>
                  <div>
                    <h3>{equipment.name}</h3>
                    <p>Modelo: {equipment.model}</p>
                    <p>
                      Estado:{" "}
                      <span style={{ color: equipment.latestState?.color }}>
                        {equipment.latestState?.name}
                      </span>
                    </p>
                    <p>Produtividade: {equipment.productivity.toFixed(2)}%</p>
                    <p>Ganhos: R$ {equipment.earnings.toFixed(2)}</p>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
        <MapLegend
          equipmentStates={equipmentStates}
          equipmentTypes={equipmentTypes}
        />
      </StyledMapContainer>
      {selectedEquipment && (
        <StateHistoryModal
          open={isModalOpen}
          onClose={handleCloseModal}
          equipmentName={selectedEquipment.name}
          stateHistory={getStateHistory(selectedEquipment)}
        />
      )}
    </>
  );
};

export default EquipmentMap;
