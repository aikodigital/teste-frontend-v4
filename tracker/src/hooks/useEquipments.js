import React from "react";
import { getAllEquipments } from "../services/equipmentService";

/**
 * Custom hook to fetch and return equipment data based on optional filters.
 *
 * @param {Object} [params] - Optional parameters to filter the equipment.
 * @param {string} [params.stateId] - The state identifier used for filtering the equipment.
 * @param {string} [params.modelId] - The model identifier used for filtering the equipment.
 * @returns {Array|Object|null} The fetched equipment data, or `null` if the data is still loading.
 */
export function useEquipments({ stateId, modelId } = {}) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function loadEquipments() {
      const equipmentsData = await getAllEquipments({ stateId, modelId });
      setData(equipmentsData);
    }
    loadEquipments();
  }, [stateId, modelId]);

  return data;
}
