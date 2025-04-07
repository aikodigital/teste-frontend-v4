import { useState, useEffect } from "react";
import getEquipmentData from '@/lib/getEquipmentData';
import CustomMarker from "./CustomMarker";

export default function MarkersList() {
  const [equipmentData, setEquipmentData] = useState(null);

  useEffect(() => {
    getEquipmentData({
      positionHistoryFilePath: "/src/data/equipmentPositionHistory.json",
      stateHistoryFilePath: "/src/data/equipmentStateHistory.json"
    })
      .then((result) => {
        setEquipmentData(result);
      });
  }, [])

  return (
    equipmentData && (
      equipmentData.map(({lastPosition, lastState, stateHistory}) => (
        <div key={lastPosition.equipmentId}>
          <CustomMarker
            lastPosition={lastPosition}
            lastState={lastState}
            stateHistory={stateHistory}
          />
        </div>
      ))
    )
  )
}