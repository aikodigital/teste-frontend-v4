import { fetchEquipmentsStateHistory } from "@/services/equipment-state-history";
import { EquipmentStateHistory } from "@/types/response.types";
import { useEffect, useState } from "react";

export function useEquipmentStatesHistory() {
  const [equipmentStateHistory, setEquipmentStateHistory] = useState<
    EquipmentStateHistory[]
  >([]);
  const [equipmentStateHistoryLoading, setEquipmentStateHistoryLoading] =
    useState(true);

  useEffect(() => {
    fetchEquipmentsStateHistory()
      .then(setEquipmentStateHistory)
      .finally(() => setEquipmentStateHistoryLoading(false))
      .catch(console.error);
  }, []);

  return { equipmentStateHistory, equipmentStateHistoryLoading };
}
