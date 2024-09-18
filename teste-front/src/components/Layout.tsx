import React, { useState, useEffect, useRef } from "react";
import EquipmentList from "./EquipmentList";
import EquipmentInfo from "./EquipmentInfo";
import EquipmentMap from "./EquipmentMap";
import FilterPanel from "./FilterPanel";
import "../styles/layout.scss";
import {
  getEquipmentData,
  getEquipmentStateHistory,
  getEquipmentModels,
  getEquipmentStates,
} from "../services/equipmentService";

const Layout = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("Todos");
  const [equipment, setEquipment] = useState<any[]>([]);
  const [stateHistory, setStateHistory] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setEquipment(getEquipmentData());
    setStateHistory(getEquipmentStateHistory());
    setModels(getEquipmentModels());
    setStates(getEquipmentStates());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  const handleSelectEquipment = (id: string | null) => {
    setSelectedEquipment(id);
    setSidebarOpen(false);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const getCurrentState = (equipmentId: string) => {
    const equipmentStateHistories = stateHistory.find(
      (history: any) => history.equipmentId === equipmentId
    );

    if (!equipmentStateHistories || equipmentStateHistories.states.length === 0) {
      return { name: "Desconhecido", color: "#bdc3c7", id: "" };
    }

    const latestStateId =
      equipmentStateHistories.states[equipmentStateHistories.states.length - 1]
        .equipmentStateId;
    const latestState = states.find((state: any) => state.id === latestStateId);

    return latestState
      ? { ...latestState, id: latestStateId }
      : { name: "Desconhecido", color: "#bdc3c7", id: "" };
  };

  const getEquipmentModel = (equipmentModelId: string, equipmentStateId: string) => {
    const model = models.find((model: any) => model.id === equipmentModelId);
    if (!model) return { name: "Modelo Desconhecido", hourlyEarnings: 0 };

    const earnings = model.hourlyEarnings.find(
      (earning: any) => earning.equipmentStateId === equipmentStateId
    );
    const hourlyEarnings = earnings ? earnings.value : 0;

    return { name: model.name, hourlyEarnings };
  };

  const filteredEquipment = equipment.filter((equip) => {
    const currentState = getCurrentState(equip.id);
    const matchesSearch = searchQuery
      ? equip.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    if (filter === "Todos") return matchesSearch;
    return matchesSearch && currentState.name === filter;
  });

  const selectedEquip = equipment.find((equip) => equip.id === selectedEquipment);
  const currentState = selectedEquip ? getCurrentState(selectedEquip.id) : null;
  const model = selectedEquip && currentState
    ? getEquipmentModel(selectedEquip.equipmentModelId, currentState.id)
    : null;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDeselectEquipment = () => {
    setSelectedEquipment(null);
  };

  return (
    <div className="layout">
      <button className="hamburger-menu" onClick={toggleSidebar}>
        ☰
      </button>

      <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <FilterPanel onFilterChange={handleFilterChange} selectedFilter={filter} />
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Pesquisar equipamento"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <EquipmentList
          equipment={filteredEquipment}
          selectedEquipment={selectedEquipment}
          onSelectEquipment={handleSelectEquipment}
        />
      </div>

      <div className="main">
        <EquipmentMap
          selectedEquipment={selectedEquipment}
          filter={filter}
          getCurrentState={getCurrentState}
          getEquipmentModel={getEquipmentModel}
          onDeselectEquipment={handleDeselectEquipment}
        />
        {selectedEquip && currentState && model && (
          <EquipmentInfo
            equipment={selectedEquip}
            currentState={currentState}
            model={model}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;
