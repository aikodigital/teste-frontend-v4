"use client";

import { DataTable } from "@/components/ui/data-table";
import { Equipment } from "@/types/Equipment";
import { columns } from "./columns";
import React, { useEffect, useState } from "react";
import {
  getEquipment,
  getEquipmentModel,
  getEquipmentState,
  getEquipmentStateHistory,
  getStateNameById,
} from "@/app/services/actions";

const EquipmentList: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentData = await getEquipment();
        const modelData = await getEquipmentModel();
        const stateHistoryData = await getEquipmentStateHistory();
        const statesData = await getEquipmentState();

        const modelMap = new Map(
          modelData.map((model: any) => [model.id, model.name])
        );

        const stateMap = new Map(
          stateHistoryData.map((history: any) => {
            const latestState = history.states[history.states.length - 1];
            return [history.equipmentId, latestState.equipmentStateId];
          })
        );

        const equipmentDetails = equipmentData.map((equipment) => {
          const latestStateId = stateMap.get(equipment.id);

          let latestStateName: string | undefined;
          if (typeof latestStateId === "string") {
            latestStateName = getStateNameById(latestStateId, statesData);
          }

          return {
            ...equipment,
            modelName: modelMap.get(equipment.equipmentModelId),
            latestStateName: latestStateName,
          };
        });

        setEquipment(equipmentDetails);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="text-lg font-medium mb-10 font-semibold">
          Listagem de Equipamentos
        </h3>
      </div>
      <DataTable columns={columns} data={equipment} />
    </div>
  );
};

export default EquipmentList;
