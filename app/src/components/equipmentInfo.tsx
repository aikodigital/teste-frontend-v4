import { useEffect, useState } from "react";
import {
  calculateProductivity,
  fetchEquipmentModel,
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

  const startDate = "2021-02-01T00:00:00.000Z";
  const endDate = "2021-02-02T23:59:59.000Z";

  const productivity = calculateProductivity(
    "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
    startDate,
    endDate
  );

  console.log(`Productivity: ${productivity}%`);

  return (
    <div>
      <p>
        Nome:
        <span className="font-bold"> {equipment.name}</span>
      </p>
      <p>
        Modelo:
        <span className="font-bold">
          {" "}
          {fetchEquipmentModel(equipment.equipmentModelId).name}
        </span>
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
      <div>
        <p>Produtividade: </p>
        <p>{calculateProductivity(equipment.id, startDate, endDate)}%</p>
      </div>

      <div>
        <p className="text-xl font-bold mt-4">Histórico de operação: </p>
        <div className="relative rounded-md border overflow-auto max-h-[50vh]">
          <StateHistoryTable equipmentStateHistory={equipmentStateHistory} />
        </div>
      </div>
    </div>
  );
};
