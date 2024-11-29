import { useEffect, useState } from "react";
import {
  Equipment,
  EquipmentState,
  EquipmentStateHistory,
  EquipmentModel,
  EquipmentPositionHistory,
} from "@/types/equipment.type";
import { fetchData } from "@/utils/fetch-data.util";

interface EquipmentHistoryEntry {
  date: string;
  type: "state";
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
  history: EquipmentHistoryEntry[];
}

export function useEquipmentHistory(equipmentId: string) {
  const [historyData, setHistoryData] = useState<EquipmentWithHistory | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          equipments,
          equipmentModels,
          equipmentStates,
          equipmentStateHistories,
        ] = await Promise.all([
          fetchData<Equipment[]>("/data/equipment.json"),
          fetchData<EquipmentModel[]>("/data/equipment-model.json"),
          fetchData<EquipmentState[]>("/data/equipment-state.json"),
          fetchData<EquipmentStateHistory[]>(
            "/data/equipment-state-history.json",
          ),
          fetchData<EquipmentPositionHistory[]>(
            "/data/equipment-position-history.json",
          ),
        ]);

        const equipment = equipments.find((eq) => eq.id === equipmentId);
        if (!equipment) {
          throw new Error(`Equipment with ID "${equipmentId}" not found`);
        }

        const model =
          equipmentModels.find(
            (model) => model.id === equipment.equipmentModelId,
          )?.name || "Unknown";

        const stateHistory =
          equipmentStateHistories.find(
            (history) => history.equipmentId === equipment.id,
          )?.states || [];

        const stateEntries: EquipmentHistoryEntry[] = stateHistory.map(
          (entry) => {
            const stateDetails = equipmentStates.find(
              (state) => state.id === entry.equipmentStateId,
            );
            return {
              date: entry.date,
              type: "state",
              state: {
                id: stateDetails?.id || "",
                name: stateDetails?.name || "Unknown",
                color: stateDetails?.color || "gray",
              },
            };
          },
        );

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

    if (equipmentId) fetchAllData();
  }, [equipmentId]);

  return {
    data: historyData,
    loading,
    error,
  };
}
