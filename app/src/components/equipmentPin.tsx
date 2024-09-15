import {
  fetchOrderedEquipmentState,
  getCurrentStateData,
} from "@/api/simulatedApi";
import { useEffect, useState } from "react";
import { FaTruckMoving } from "react-icons/fa6";

export const EquipmentPin = ({ equipment }) => {
  const [equipmentModel, setEquipmentModel] = useState("");

  const [equipmentStateHistory, setEquipmentStateHistory] = useState(
    fetchOrderedEquipmentState(equipment.id)
  );

  useEffect(() => {
    setEquipmentStateHistory(fetchOrderedEquipmentState(equipment.id));
  }, [equipment]);

  return (
    <div className="bg-white/40 p-1 rounded-lg">
      <FaTruckMoving
        size={24}
        color={`${
          getCurrentStateData(equipmentStateHistory[0].equipmentStateId).color
        }`}
      />
    </div>
  );
};
