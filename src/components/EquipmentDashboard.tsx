import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import { getEquipmentDetails } from "../utils/dataProcessing";
import { Equipment, EquipmentState } from "../types/sharedTypes";

import equipmentsData from "../data/equipment.json";
import equipmentModelsData from "../data/equipmentModel.json";
import equipmentStatesData from "../data/equipmentState.json";
import positionHistoriesData from "../data/equipmentPositionHistory.json";
import stateHistoriesData from "../data/equipmentStateHistory.json";

const EquipmentDashboard: React.FC = () => {
  const [equipmentDetails, setEquipmentDetails] = useState<Equipment[]>([]);
  const [equipmentStates, setEquipmentStates] = useState<EquipmentState[]>([]);
  const userName = "João Teste";

  useEffect(() => {
    const states: EquipmentState[] = equipmentStatesData.map((state) => ({
      id: state.id,
      name: state.name,
      color: state.color,
    }));
    setEquipmentStates(states);

    const details = equipmentsData
      .map((equipment) =>
        getEquipmentDetails(
          equipment,
          equipmentModelsData,
          states,
          positionHistoriesData,
          stateHistoriesData,
        ),
      )
      .filter((detail): detail is Equipment => detail !== null);

    setEquipmentDetails(details);
  }, []);

  return (
    <MainLayout
      equipments={equipmentDetails}
      userName={userName}
      equipmentStates={equipmentStates}
    />
  );
};

export default EquipmentDashboard;
