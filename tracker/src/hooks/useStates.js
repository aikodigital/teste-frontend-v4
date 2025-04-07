import React from "react";
import { fetchStates } from "../services/equipmentService";

/**
 * Custom hook that returns a simplified list of states.
 *
 * @returns {Array<{id: string, name: string}>|null} A list of state objects, or null if the data has not been loaded yet.
 */
export function useStates() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function loadStates() {
      const states = await fetchStates();
      const statesSimple = states.map((state) => ({
        id: state.id,
        name: state.name,
      }));
      setData(statesSimple);
    }
    loadStates();
  }, []);

  return data;
}
