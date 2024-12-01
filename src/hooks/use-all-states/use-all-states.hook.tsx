import {
  Equipment,
  EquipmentModel,
  EquipmentState,
  EquipmentStateHistory,
} from "@/types/equipment.type";
import { fetchData } from "@/utils/fetch-data.util";
import { useEffect, useState } from "react";
import { EquipmentHistoryEntry } from "../use-equipment-history/use-equipment-history.hook";

interface EquipmentWithHistoryLastState {
  id: string;
  name: string;
  model: string;
  history: EquipmentHistoryEntry[];
  lastState: EquipmentHistoryEntry | null;
}

export function useAllEquipmentHistory() {
  const [historyData, setHistoryData] = useState<
    EquipmentWithHistoryLastState[]
  >([]);
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
        ]);

        const allHistoryData = equipments.map((equipment) => {
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

          const lastStateEntry = stateEntries.length
            ? stateEntries[stateEntries.length - 1]
            : null;

          return {
            id: equipment.id,
            name: equipment.name,
            model,
            history: stateEntries.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            ),
            lastState: lastStateEntry,
          };
        });

        setHistoryData(allHistoryData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return {
    data: historyData,
    loading,
    error,
  };
}
