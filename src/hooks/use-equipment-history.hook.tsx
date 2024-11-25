import { useEffect, useState } from "react";
import {
  Equipment,
  EquipmentState,
  EquipmentStateHistory,
  EquipmentModel,
} from "@/types/equipment.type";

import {
  fetchEquipment,
  fetchEquipmentModel,
  fetchEquipmentState,
  fetchEquipmentStateHistory,
} from "./use-equipment/use-equipment.hook";

interface EquipmentHistoryEntry {
  date: string;
  type: "state"; // Alterado para apenas "state"
  state?: {
    id: string;
    name: string;
    color: string;
  };
}

interface EquipmentWithHistory {
  id: string;
  name: string;
  model: string;
  history: EquipmentHistoryEntry[]; // Apenas histórico de estado
}

export function useEquipmentHistory(equipmentId: string) {
  const [historyData, setHistoryData] = useState<EquipmentWithHistory | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          equipments,
          equipmentModels,
          equipmentStates,
          equipmentStateHistories,
        ]: [
          Equipment[],
          EquipmentModel[],
          EquipmentState[],
          EquipmentStateHistory[],
        ] = await Promise.all([
          fetchEquipment(),
          fetchEquipmentModel(),
          fetchEquipmentState(),
          fetchEquipmentStateHistory(),
        ]);

        // Encontrar o equipamento pelo ID
        const equipment = equipments.find((eq) => eq.id === equipmentId);
        if (!equipment) {
          throw new Error(`Equipment with ID "${equipmentId}" not found`);
        }

        // Modelo do equipamento
        const model =
          equipmentModels.find(
            (model) => model.id === equipment.equipmentModelId,
          )?.name || "Unknown";

        // Histórico de estados
        const stateHistory =
          equipmentStateHistories.find(
            (history) => history.equipmentId === equipment.id,
          )?.states || [];

        // Criar as entradas do histórico de estado
        const stateEntries: EquipmentHistoryEntry[] = stateHistory.map(
          (entry) => {
            const stateDetails = equipmentStates.find(
              (state) => state.id === entry.equipmentStateId,
            );
            return {
              date: entry.date,
              type: "state", // Apenas estado
              state: {
                id: stateDetails?.id || "",
                name: stateDetails?.name || "Unknown",
                color: stateDetails?.color || "gray",
              },
            };
          },
        );

        // Definir os dados finais
        setHistoryData({
          id: equipment.id,
          name: equipment.name,
          model,
          history: stateEntries.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          ),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (equipmentId) fetchData();
  }, [equipmentId]);

  return {
    data: historyData,
    loading,
    error,
  };
}
