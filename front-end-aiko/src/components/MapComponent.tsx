import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import equipmentData from "../../../data/equipment.json";
import equipmentModelData from "../../../data/equipmentModel.json";
import positionHistoryData from "../../../data/equipmentPositionHistory.json";
import equipmentStateData from "../../../data/equipmentstate.json";
import equipmentStateHistoryData from "../../../data/equipmentstatehistory.json";
import getCustomIcon from "./IconComponent";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Pagination } from "@mui/material";

interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}

interface State {
  id: string;
  name: string;
  color: string;
}

interface EquipmentStateHistory {
  equipmentId: string;
  states: { date: string; equipmentStateId: string }[];
}

interface MapComponentProps {
  selectedState: string | null;
  selectedModel: string | null;
  searchQuery: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ selectedState, selectedModel, searchQuery }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [stateHistory, setStateHistory] = useState<{ id: string, name: string, color: string, date: string }[]>([]);

  useEffect(() => {
    const map = L.map("map").setView([-19.100, -45.825157], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const getMostRecentPosition = (positions: Position[]): Position => {
      return positions.reduce((latest: Position, current: Position) => {
        return new Date(current.date) > new Date(latest.date) ? current : latest;
      });
    };

    const getMostRecentState = (equipmentId: string): State => {
      const stateHistory = (equipmentStateHistoryData as EquipmentStateHistory[]).find(
        (history) => history.equipmentId === equipmentId
      );

      if (stateHistory && stateHistory.states.length > 0) {
        const mostRecentState = stateHistory.states.reduce(
          (latest, current) => (new Date(current.date) > new Date(latest.date) ? current : latest)
        );

        const stateInfo = (equipmentStateData as State[]).find(
          (state) => state.id === mostRecentState.equipmentStateId
        );
        return stateInfo
          ? stateInfo
          : { id: "unknown", name: "Unknown", color: "#000000" };
      }

      return { id: "unknown", name: "Unknown", color: "#000000" };
    };

    const filterEquipment = (equipment: Equipment) => {
      const model = equipmentModelData.find((model) => model.id === equipment.equipmentModelId);
      const mostRecentState = getMostRecentState(equipment.id);

      if (selectedState && mostRecentState.name !== selectedState) return false;

      if (selectedModel && model?.name !== selectedModel) return false;

      if (
        searchQuery &&
        !equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !equipment.id.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    };

    equipmentData.filter(filterEquipment).forEach((equipment: Equipment) => {
      const equipmentHistory = (positionHistoryData as EquipmentPositionHistory[]).find(
        (history) => history.equipmentId === equipment.id
      );

      if (equipmentHistory && equipmentHistory.positions.length > 0) {
        const mostRecentPosition = getMostRecentPosition(equipmentHistory.positions);
        const mostRecentState = getMostRecentState(equipment.id);

        const model = equipmentModelData.find((model) => model.id === equipment.equipmentModelId);
        const customIcon = getCustomIcon(model?.name || "default");

        const marker = L.marker([mostRecentPosition.lat, mostRecentPosition.lon], { icon: customIcon }).addTo(map);

        const popupContent = `
          <b>ID:</b> ${equipment.id}<br>
          <b>Nome:</b> ${equipment.name}<br>
          <b>Modelo:</b> ${model?.name || "Desconhecido"}<br>
          <b>Estado Atual:</b> <span style="color:${mostRecentState.color};">${mostRecentState.name}</span><br>
          <b>Data da Posição:</b> ${new Date(mostRecentPosition.date).toLocaleString()}<br>
        `;

        marker.bindPopup(popupContent);
        marker.on("click", () => handleEquipmentClick(equipment));
      }
    });

    const handleEquipmentClick = (equipment: Equipment) => {
      setSelectedEquipment(equipment);
      const equipmentStateHistory = (equipmentStateHistoryData as EquipmentStateHistory[]).find(
        (history) => history.equipmentId === equipment.id
      );
      if (equipmentStateHistory) {
        const stateHistory = equipmentStateHistory.states.map((stateRecord) => {
          const stateInfo = (equipmentStateData as State[]).find((state) => state.id === stateRecord.equipmentStateId);
          return {
            id: stateInfo?.id || "unknown",  
            name: stateInfo?.name || "Unknown",
            color: stateInfo?.color || "#000000",
            date: stateRecord.date,
          };
        });
        setStateHistory(stateHistory);  
      }
    };

    return () => {
      map.remove();
    };
  }, [selectedState, selectedModel, searchQuery]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEquipment(null);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const itemsPerPage = 5;
  const paginatedStateHistory = stateHistory.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <div id="map" style={{ height: "800px", width: "100%" }} />
      {selectedEquipment && (
        <div style={{ margin: "10px" }}>
          <Button variant="text" onClick={handleOpenDialog}>
            Ver Histórico de Estados
          </Button>
        </div>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Histórico de Estados - {selectedEquipment?.name}</DialogTitle>
        <DialogContent>
          {paginatedStateHistory.map((state, index) => (
            <div key={index}>
              <b>Data:</b> {new Date(state.date).toLocaleString()} <br />
              <b>Estado:</b> <span style={{ color: state.color }}>{state.name}</span>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Pagination
            count={Math.ceil(stateHistory.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MapComponent;
