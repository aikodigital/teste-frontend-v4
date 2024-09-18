import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Equipment } from "./../../types";
import equipmentData from "../../../data/equipment.json";
import equipamentPositionHistory from "../../../data/equipmentPositionHistory.json";
import { findEquipmentState } from "../utils/findEquipmentState";
import { findEquipmentSerialNumber } from "../utils/findEquipmentSerialNumber";
import { findEquipmentName } from "../utils/findEquipmentName";
import { liveIcon } from "../utils/liveIcon";
import { statusFilter } from "../../store/statusFilter";
import { iconShow } from "../../store/iconShow";


interface MapViewProps {
  onSelectEquipment: (equipment: Equipment) => void;
  filters: {searchTerm: string; status: string;}
}

const MapView = ({ onSelectEquipment, filters }: MapViewProps) => {
  const [filteredData, setFilteredData] = useState(equipamentPositionHistory);

  const currentStatus = statusFilter((state) => state.Status);
  const currentIconShow = iconShow((state) => state.iconShowStatus);

  const escapeRegExp = (input: string | undefined) => {
    if (typeof input !== "string") return ""; 
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  useEffect(() => {
    const escapedFilters = escapeRegExp(filters.searchTerm);
    const regex = new RegExp(escapedFilters, "i");


    let filtered = equipamentPositionHistory;
    if (currentStatus !== "Todos os Status") {
      filtered = filtered.filter(
        (position) => findEquipmentState(position) === currentStatus
      );
    }

    if (filters) {
      filtered = filtered.filter((position) => {
        const equipmentName = findEquipmentName(position) || ""; 
        const equipmentSerialNumber = findEquipmentSerialNumber(position) || ""; 
        return (
          regex.test(equipmentName) || regex.test(equipmentSerialNumber)
        );
      });
    }

    setFilteredData(filtered);
  }, [currentStatus, filters]);

  const handleMarkerClick = (equipmentId: string) => {
    const equipment = equipmentData.find((e) => e.id === equipmentId);
    if (equipment) {
      onSelectEquipment(equipment);
    }
  };


  return (
    <MapContainer
      center={[-19.126536, -45.947756]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredData.length > 0 ? (
        filteredData.map((position) => {
          const equipmentState = findEquipmentState(position);
          const equipmentName = findEquipmentName(position) || "Desconhecido";
          const equipmentSerialNumber = findEquipmentSerialNumber(position) || "N/A";

          return (
            <Marker
              key={position.equipmentId}
              position={[position.positions[0].lat, position.positions[0].lon]}
              icon={liveIcon(equipmentState, equipmentName, currentIconShow)}
              eventHandlers={{
                click: () => handleMarkerClick(position.equipmentId),
              }}>
              <Popup>
                <p>Nome: {equipmentSerialNumber}</p>
                <p>Equipamento: {equipmentName}</p>
                <p>Status Atual: {equipmentState}</p>
              </Popup>
            </Marker>
          );
        })
      ) : (
        <p>Nenhum equipamento encontrado para o status ou termo de busca selecionado.</p>
      )}
    </MapContainer>
  );
};

export default MapView;
