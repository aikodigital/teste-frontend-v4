import { useEffect, useState } from "react";
import {
  Equipment,
  EquipmentState,
  EquipmentStateHistory,
  EquipmentPositionHistory,
  EquipmentModel,
} from "@/types/equipment.type";

import {
  fetchEquipment,
  fetchEquipmentModel,
  fetchEquipmentPositionHistory,
  fetchEquipmentState,
  fetchEquipmentStateHistory,
} from "./use-equipment.hook";

interface EquipmentHistoryEntry {
  date: string;
  type: "state" | "position";
  state?: {
    id: string;
    name: string;
    color: string;
  };
  position?: {
    lat: number;
    lon: number;
  };
}

interface EquipmentWithHistory {
  id: string;
  name: string;
  model: string;
  history: EquipmentHistoryEntry[];
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
          equipmentPositionHistories,
        ]: [
          Equipment[],
          EquipmentModel[],
          EquipmentState[],
          EquipmentStateHistory[],
          EquipmentPositionHistory[],
        ] = await Promise.all([
          fetchEquipment(),
          fetchEquipmentModel(),
          fetchEquipmentState(),
          fetchEquipmentStateHistory(),
          fetchEquipmentPositionHistory(),
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

        // Histórico de posições
        const positionHistory =
          equipmentPositionHistories.find(
            (history) => history.equipmentId === equipment.id,
          )?.positions || [];

        // Histórico de estados
        const stateHistory =
          equipmentStateHistories.find(
            (history) => history.equipmentId === equipment.id,
          )?.states || [];

        // Combinar posições e estados por data
        const combinedEntries: EquipmentHistoryEntry[] = [
          ...positionHistory.map((entry) => ({
            date: entry.date,
            type: "position" as const,
            position: {
              lat: entry.lat,
              lon: entry.lon,
            },
          })),
          ...stateHistory.map((entry) => {
            const stateDetails = equipmentStates.find(
              (state) => state.id === entry.equipmentStateId,
            );
            return {
              date: entry.date,
              type: "state" as const,
              state: {
                id: stateDetails?.id || "",
                name: stateDetails?.name || "Unknown",
                color: stateDetails?.color || "gray",
              },
            };
          }),
        ].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

        setHistoryData({
          id: equipment.id,
          name: equipment.name,
          model,
          history: combinedEntries,
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
