import { useEffect, useState } from "react";
import {
  calculateProductivity,
  calculateProfit,
  calculateStateHours,
  fetchEquipmentModel,
  fetchOrderedEquipmentState,
  getCurrentStateData,
} from "../api/simulatedApi";
import { Equipment } from "../interfaces";
import { StateHistoryTable } from "./stateHistoryTable";
import { cn } from "@/utils/cn";

export const EquipmentInfo = ({
  equipment,
  formattedFromDate,
  formattedToDate,
}: {
  equipment: Equipment;
  formattedFromDate?: string;
  formattedToDate?: string;
}) => {
  const [equipmentStateHistory, setEquipmentStateHistory] = useState(
    fetchOrderedEquipmentState(equipment.id)
  );

  const [currentState, setCurrentState] = useState<{
    id: string;
    name: string;
    color: string;
  }>();

  useEffect(() => {
    setEquipmentStateHistory(
      fetchOrderedEquipmentState(
        equipment.id,
        formattedFromDate,
        formattedToDate
      )
    );
  }, [equipment, formattedFromDate, formattedToDate]);

  useEffect(() => {
    const allStates = fetchOrderedEquipmentState(equipment.id);

    if (allStates.length > 0) {
      setCurrentState(getCurrentStateData(allStates[0].equipmentStateId));
    }
  }, [equipment]);

  const hoursByState: {
    operating: number;
    stopped: number;
    maintenance: number;
  } = calculateStateHours(equipmentStateHistory);

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
          {fetchEquipmentModel(equipment?.equipmentModelId).name}
        </span>
      </p>
      <p>
        Status Atual:{" "}
        {currentState ? (
          <span
            className={cn("font-bold", {
              "text-[#2ecc71]": currentState.color === "#2ecc71",
              "text-[#f1c40f]": currentState.color === "#f1c40f",
              "text-[#e74c3c]": currentState.color === "#e74c3c",
            })}
          >
            {currentState.name}
          </span>
        ) : (
          <span className="text-muted-foreground">Sem histórico</span>
        )}
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold mt-4">Histórico de operação: </p>

        <div className="flex gap-2">
          <p>Produtividade: </p>

          <p>
            {calculateProductivity(
              equipment.id,
              formattedFromDate,
              formattedToDate
            ).toFixed(2)}
            %
          </p>

          <p className="font-bold"> | </p>

          <p>Rentabilidade: </p>

          <p>
            R${" "}
            {calculateProfit({
              maintanenceHours: hoursByState.maintenance,
              operatingHours: hoursByState.operating,
              stoppedHours: hoursByState.stopped,
              modelId: equipment.equipmentModelId,
            })}
          </p>
        </div>

        <div>
          <div className="relative rounded-md border overflow-auto max-h-[30vh]">
            <StateHistoryTable equipmentStateHistory={equipmentStateHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};
