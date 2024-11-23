import { fetchEquipmentsState } from "@/services/equipment-state.service";
import { EquipmentState } from "@/types/response.types";
import { useEffect, useState } from "react";

export function useEquipmentStates() {
  const [equipmentState, setEquipmentState] = useState<EquipmentState[]>([]);
  const [equipmentStateLoading, setEquipmentStateLoading] = useState(true);

  useEffect(() => {
    fetchEquipmentsState()
      .then(setEquipmentState)
      .finally(() => setEquipmentStateLoading(false))
      .catch(console.error);
  }, []);

  return { equipmentState, equipmentStateLoading };
}
