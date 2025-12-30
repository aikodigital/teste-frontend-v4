import { useState, useEffect } from "react";

import MapView from "../components/MapView/MapView.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import EquipmentModal from "../components/EquipmentModal/EquipmentModal";


import { loadData } from "../services/dataServices";
import {
  getLatestByDate,
  getCurrentState,
  filterHistoryByDate,
} from "../utils/equipmentUtils";

function Dashboard() {
  const { equipment, positionHistory, stateHistory, equipmentState } = loadData();
  
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showHistory, setShowHistory] = useState(true);
  const [dateFilter, setDateFilter] = useState({
    start: "",
    end: "",
  });
  const [timelineIndex, setTimelineIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (selectedEquipment?.history?.length) {
      setTimelineIndex(0);
    }
  }, [selectedEquipment]);

  useEffect(() => {
    if (!isPlaying || !selectedEquipment) return;

    const interval = setInterval(() => {
      setTimelineIndex((prev) => {
        if (prev === null) return 0;
        if (prev >= selectedEquipment.history.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 500); // velocidade (ms)

    return () => clearInterval(interval);
  }, [isPlaying, selectedEquipment]);




  function handleSelectEquipment(eq) {
    setSelectedEquipment((current) => (current?.id === eq.id ? null : eq));
  }

  const equipmentStateMap = {};
  equipmentState.forEach((state) => {
    equipmentStateMap[state.id] = state;
  });

const equipmentsWithPosition = equipment.map((eq) => {
  const positionsEntry = positionHistory.find((p) => p.equipmentId === eq.id);

  const stateEntry = stateHistory.find((s) => s.equipmentId === eq.id);

  const positions = positionsEntry?.positions || [];
  const states = stateEntry?.states || [];

    const filteredHistory = filterHistoryByDate(
      positions,
      dateFilter.start,
      dateFilter.end
    );

  const currentState = getCurrentState(eq.id, stateHistory, equipmentStateMap);

  return {
    ...eq,
    position: getLatestByDate(filteredHistory),
    state: currentState,
    stateHistory: states,
    history: filteredHistory,
  };
});

  const filteredEquipment =
    statusFilter === "ALL"
      ? equipmentsWithPosition
      : equipmentsWithPosition.filter((eq) => eq.state?.name === statusFilter);

  return (
    <div style={{ display: "flex", height: "100vh" }} className="dashboard">
      <Sidebar
        equipments={filteredEquipment}
        selectedEquipment={selectedEquipment}
        onSelect={handleSelectEquipment}
        statusFilter={statusFilter}
        onChangeFilter={setStatusFilter}
        showHistory={showHistory}
        onToggleHistory={setShowHistory}
        dateFilter={dateFilter}
        onChangeDateFilter={setDateFilter}
        timelineIndex={timelineIndex}
        setTimelineIndex={setTimelineIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onOpenHistory={() => setShowModal(true)}
      />

      <MapView
        equipments={filteredEquipment}
        selectedEquipment={selectedEquipment}
        onMapClick={() => setSelectedEquipment(null)}
        showHistory={showHistory}
        equipmentStateMap={equipmentStateMap}
        timelineIndex={timelineIndex}
      />

      {showModal && selectedEquipment && (
        <EquipmentModal
          equipment={selectedEquipment}
          stateMap={equipmentStateMap}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
