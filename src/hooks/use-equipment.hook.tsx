import { fetchEquipments } from "@/services/equipment.service";
import { Equipment } from "@/types/response.types";
import { useEffect, useState } from "react";

export function useEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [equipmentLoading, setEquipmentLoading] = useState(true);

  useEffect(() => {
    fetchEquipments()
      .then(setEquipment)
      .finally(() => setEquipmentLoading(false))
      .catch(console.error);
  }, []);

  return { equipment, equipmentLoading };
}
