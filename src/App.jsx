import { useState } from "react";
import SelectedEquipmentPanel from "./components/SelectedEquipmentPanel";
import MapView from "./components/MapView";

import equipment from "./data/equipment.json";
import equipmentPositionHistory from "./data/equipmentPositionHistory.json";
import equipmentState from "./data/equipmentState.json";
import equipmentStateHistory from "./data/equipmentStateHistory.json";

function App() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const handleMarkerClick = (equipment) => {
    setSelectedEquipment(equipment);
  };

  return (
    <div className="relative">
      <MapView
        equipments={equipment}
        positions={equipmentPositionHistory}
        states={equipmentState}
        onMarkerClick={handleMarkerClick}
      />

      <SelectedEquipmentPanel
        equipment={selectedEquipment}
        stateHistory={equipmentStateHistory}
        states={equipmentState}
        onClose={() => setSelectedEquipment(null)}
      />
    </div>
  );
}

export default App;