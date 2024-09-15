import {
  fetchEquipmentModel,
  fetchOrderedEquipmentState,
  getCurrentStateData,
} from "@/api/simulatedApi";
import { Equipment } from "@/interfaces";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { FaQuestion, FaTractor, FaTruckMoving } from "react-icons/fa6";
import { GiBirdClaw } from "react-icons/gi";

export const EquipmentPin = ({
  equipment,
  isSelected,
}: {
  equipment: Equipment;
  isSelected: boolean;
}) => {
  const [equipmentModel, setEquipmentModel] = useState(
    fetchEquipmentModel(equipment.equipmentModelId)
  );

  const [equipmentStateHistory, setEquipmentStateHistory] = useState(
    fetchOrderedEquipmentState(equipment.id)
  );

  useEffect(() => {
    setEquipmentStateHistory(fetchOrderedEquipmentState(equipment.id));
    setEquipmentModel(fetchEquipmentModel(equipment.equipmentModelId));
  }, [equipment]);

  return (
    <div
      className={cn("p-1 rounded-lg bg-white/30", {
        "bg-white/80 z-10": isSelected,
      })}
    >
      {equipmentIcon({
        modelName: equipmentModel.name,
        color: getCurrentStateData(equipmentStateHistory[0].equipmentStateId)
          .color,
        isSelected,
      })}
    </div>
  );
};

const equipmentIcon = ({
  modelName,
  color,
  isSelected,
}: {
  modelName: string;
  color: string;
  isSelected: boolean;
}) => {
  if (modelName === "Caminhão de carga") {
    return <FaTruckMoving size={isSelected ? 40 : 24} color={color} />;
  }

  if (modelName === "Harvester") {
    return <FaTractor size={isSelected ? 40 : 24} color={color} />;
  }

  if (modelName === "Garra traçadora") {
    return <GiBirdClaw size={isSelected ? 40 : 24} color={color} />;
  }

  return <FaQuestion size={isSelected ? 40 : 24} color={color} />;
};
