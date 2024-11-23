import { fetchEquipmentsModel } from "@/services/equipment-model.service";
import { EquipmentModel } from "@/types/response.types";
import { useEffect, useState } from "react";

export function useEquipmentModel() {
  const [equipmentModel, setEquipmentModel] = useState<EquipmentModel[]>([]);
  const [equipmentModelLoading, setEquipmentModelLoading] = useState(true);

  useEffect(() => {
    fetchEquipmentsModel()
      .then(setEquipmentModel)
      .finally(() => setEquipmentModelLoading(false))
      .catch(console.error);
  }, []);

  return { equipmentModel, equipmentModelLoading };
}
