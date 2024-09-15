import { useEffect, useState } from "react";
import {
  fetchOrderedEquipmentState,
  getCurrentStateData,
} from "../api/simulatedApi";
import { Equipment } from "../interfaces";
import { cn } from "../utils/cn";
import { StateHistoryTable } from "./stateHistoryTable";

export const EquipmentInfo = ({ equipment }: { equipment: Equipment }) => {
  const [equipmentStateHistory, setEquipmentStateHistory] = useState(
    fetchOrderedEquipmentState(equipment.id)
  );

  useEffect(() => {
    setEquipmentStateHistory(fetchOrderedEquipmentState(equipment.id));
  }, [equipment]);

  return (
    <div>
      <p>
        Nome:
        <span className="font-bold"> {equipment.name}</span>
      </p>
      <p>
        Status Atual:{" "}
        <span
          className={cn("font-bold", {
            "text-[#2ecc71]":
              getCurrentStateData(equipmentStateHistory[0].equipmentStateId)
                .color === "#2ecc71",

            "text-[#f1c40f]":
              getCurrentStateData(equipmentStateHistory[0].equipmentStateId)
                .color === "#f1c40f",

            "text-[#e74c3c]":
              getCurrentStateData(equipmentStateHistory[0].equipmentStateId)
                .color === "#e74c3c",
          })}
        >
          {getCurrentStateData(equipmentStateHistory[0].equipmentStateId).name}
        </span>
      </p>
      <p className="text-xl font-bold mt-4">Histórico de operação: </p>
      <div className="relative rounded-md border overflow-auto max-h-[50vh]">
        <StateHistoryTable equipmentStateHistory={equipmentStateHistory} />
      </div>
    </div>
  );
};
