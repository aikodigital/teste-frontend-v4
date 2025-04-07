import React from "react";
import { fetchModels } from "../services/equipmentService";

/**
 * Custom hook that fetches and returns equipment models.
 *
 * @returns {Array<{ id: number, name: string }>|null} An array of simplified models or null while the data is loading.
 */
export function useModels() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function loadModels() {
      const models = await fetchModels();
      const modelsSimple = models.map((model) => ({
        id: model.id,
        name: model.name,
      }));
      setData(modelsSimple);
    }
    loadModels();
  }, []);

  return data;
}
