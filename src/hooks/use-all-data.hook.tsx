// src/hooks/useAllData.ts
import { useEffect, useState } from "react";
import { EquipmentService } from "@/services/equipment.service";
import { processEquipmentData } from "@/adapters/equipment.adapter";
import { ProcessedEquipment } from "@/types/equipment.type";

function fetchAndProcessData() {
  return Promise.all([
    EquipmentService.getEquipments(),
    EquipmentService.getEquipmentModels(),
    EquipmentService.getEquipmentStates(),
    EquipmentService.getEquipmentStateHistory(),
    EquipmentService.getEquipmentPositionHistory(),
  ]).then(([equipments, models, states, stateHistory, positionHistory]) =>
    processEquipmentData(
      equipments,
      models,
      states,
      stateHistory,
      positionHistory,
    ),
  );
}

export function useAllData(id?: string) {
  // id opcional
  const [allData, setAllData] = useState<ProcessedEquipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAndProcessData()
      .then((data) => {
        const filteredData = id ? data.filter((item) => item.id === id) : data;
        if (filteredData.length === 0 && id) {
          throw new Error(`Equipment with ID ${id} not found.`);
        }
        setAllData(filteredData);
      })
      .catch((err) => setError("Failed to load equipment data. " + err))
      .finally(() => setLoading(false));
  }, [id]);

  return { allData, loading, error };
}
