import { useEffect, useState } from "react";
import { EquipmentService } from "@/services/equipment.service";
import { MaintenanceModel } from "@/types/equipment.type";

function fetchMaintenances() {
  return Promise.all([EquipmentService.getMaintenanceModels()]).then(
    ([maintenance]) => maintenance,
  );
}

export function useMaintenanceData(id?: string) {
  const [maintenances, setMaintenances] = useState<MaintenanceModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMaintenances()
      .then((data) => {
        setMaintenances(data);
      })
      .catch((err) => setError("Failed to load maintenance data. " + err))
      .finally(() => setLoading(false));
  }, [id]);

  return { maintenances, loading, error };
}
