import { fetchEquipmentsPositionHistory } from "@/services/equipment-position-history.service";
import { EquipmentPositionHistory } from "@/types/response.types";
import { useEffect, useState } from "react";

export function useEquipmentPositionHistory() {
  const [equipmentsPosition, setEquipmentsPosition] = useState<
    EquipmentPositionHistory[]
  >([]);
  const [equipmentsPositionLoading, setEquipmentsPositionLoading] =
    useState(true);

  useEffect(() => {
    fetchEquipmentsPositionHistory()
      .then(setEquipmentsPosition)
      .finally(() => setEquipmentsPositionLoading(false))
      .catch(console.error);
  }, []);

  return { equipmentsPosition, equipmentsPositionLoading };
}
