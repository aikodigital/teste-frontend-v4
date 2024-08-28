"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import equipmentDetails from "@/app/data/equipment.json";
import equipmentModels from "@/app/data/equipmentModel.json";
import equipmentStateHistory from "@/app/data/equipmentStateHistory.json";

const TrackPage = () => {
  const [equipment, setEquipment] = useState<
    (typeof equipmentDetails)[0] | null
  >(null);
  const [productivity, setProductivity] = useState<number>(0);
  const [earnings, setEarnings] = useState<number>(0);
  const [positionHistory, setPositionHistory] = useState(undefined);
  const [stateHistory, setStateHistory] = useState(null);

  const router = useRouter();
  const equipmentId = "";

  useEffect(() => {
    const equipmentFinded = equipmentDetails.find(
      (row) => row.id === equipmentId
    );

    if (equipmentFinded) {
      setEquipment(equipmentFinded);

      const model = equipmentModels.find(
        (model) => model.id === equipmentFinded.equipmentModelId
      );
      const stateHistory = equipmentStateHistory.find(
        (history) => history.equipmentId === equipmentId
      );
    }
  }, [equipmentId]);

  return (
    <div>
      <h1>Track Page</h1>
      <p>{equipmentId}</p>
    </div>
  );
};

export default TrackPage;
