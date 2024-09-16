import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import EquipmentMap from "./components/EquipmentMap";
import EquipmentList from "./components/EquipmentList";
import EquipmentDetails from "./components/EquipmentDetails";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import equipmentData from "./data/equipment.json";
import equipmentModelData from "./data/equipmentModel.json";
import equipmentPositionHistoryData from "./data/equipmentPositionHistory.json";
import equipmentStateData from "./data/equipmentState.json";
import equipmentStateHistoryData from "./data/equipmentStateHistory.json";
import "./styles/main.scss";

const App = () => {
  const [equipments, setEquipments] = useState([]);
  const [models, setModels] = useState([]);
  const [positions, setPositions] = useState([]);
  const [states, setStates] = useState([]);
  const [stateHistory, setStateHistory] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    state: "",
    model: "",
    startDate: "",
    endDate: "",
  });

  const mapRef = useRef(null);

  useEffect(() => {
    setEquipments(equipmentData);
    setModels(equipmentModelData);
    setPositions(equipmentPositionHistoryData);
    setStates(equipmentStateData);
    setStateHistory(equipmentStateHistoryData);
  }, []);

  const handleEquipmentClick = (equipment) => {
    setSelectedEquipment(equipment);

    if (mapRef.current) {
      const equipmentPosition = positions
        .find((pos) => pos.equipmentId === equipment.id)
        ?.positions.slice(-1)[0];
      if (equipmentPosition) {
        mapRef.current.setView(
          [equipmentPosition.lat, equipmentPosition.lon],
          13
        );
      }
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    setSelectedEquipment(null);

    if (mapRef.current) {
      const equipment = equipments.find((equipment) =>
        equipment.name.toLowerCase().includes(term.toLowerCase())
      );
      if (equipment) {
        const equipmentPosition = positions
          .find((pos) => pos.equipmentId === equipment.id)
          ?.positions.slice(-1)[0];
        if (equipmentPosition) {
          mapRef.current.setView(
            [equipmentPosition.lat, equipmentPosition.lon],
            13
          );
        }
      }
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setSelectedEquipment(null);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilters({ state: "", model: "", startDate: "", endDate: "" });
    setSelectedEquipment(null);

    if (mapRef.current) {
      mapRef.current.setView([-19.126536, -45.947756], 13);
    }
  };

  const filteredPositions = positions.map((pos) => {
    return {
      ...pos,
      positions: pos.positions.filter((position) => {
        const positionDate = new Date(position.date);
        const startDate = filters.startDate
          ? new Date(filters.startDate)
          : null;
        const endDate = filters.endDate ? new Date(filters.endDate) : null;
        return (
          (!startDate || positionDate >= startDate) &&
          (!endDate || positionDate <= endDate)
        );
      }),
    };
  }).filter(pos => pos.positions.length > 0);

  const filteredEquipments = equipments.filter((equipment) => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm);
    const matchesState =
      !filters.state ||
      stateHistory.some((history) => {
        const latestState = history.states.slice(-1)[0];
        return (
          history.equipmentId === equipment.id &&
          latestState.equipmentStateId === filters.state
        );
      });
    const matchesModel =
      !filters.model || equipment.equipmentModelId === filters.model;

    const matchesDateRange = filteredPositions.some(pos => pos.equipmentId === equipment.id);

    return matchesSearch && matchesState && matchesModel && matchesDateRange;
  });

  return (
    <div className="app">
      <div className="sidebar">
        <h1 className="text-2xl font-bold">Gestão de Equipamentos</h1>
        <SearchBar onSearch={handleSearch} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleClearSearch}
          style={{ marginTop: "10px" }}
        >
          Limpar Pesquisa
        </Button>
        <Filters
          states={states}
          models={models}
          filterValues={filters}
          onFilterChange={handleFilterChange}
        />
        <div className="equipment-list">
          <EquipmentList
            equipments={filteredEquipments}
            onEquipmentClick={handleEquipmentClick}
          />
        </div>
      </div>
      <div className="content">
        <div className="map-container">
        <EquipmentMap
          ref={mapRef}
          positions={filteredPositions}
          equipments={filteredEquipments}
          states={states}
          stateHistory={stateHistory}
          models={models}
          onEquipmentSelect={handleEquipmentClick}
        />
        </div>
        <EquipmentDetails
          equipment={selectedEquipment}
          stateHistory={stateHistory}
          states={states}
          onClose={() => setSelectedEquipment(null)}
        />
      </div>
    </div>
  );
};

export default App;
