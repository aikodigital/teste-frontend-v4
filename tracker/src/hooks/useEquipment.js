import React from "react";
import { getEquipmentById } from "../services/equipmentService";

/**
 * Custom hook that fetches and returns equipment data based on the provided ID.
 *
 * @param {string} equipmentId - The ID of the equipment to fetch.
 * @returns {Object|null} The equipment data, or null if the data has not been loaded yet.
 */
export function useEquipment(equipmentId) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function loadEquipment() {
      const equipmentData = await getEquipmentById(equipmentId, true);
      setData(equipmentData);
    }
    loadEquipment();
  }, [equipmentId]);

  return data;
}
