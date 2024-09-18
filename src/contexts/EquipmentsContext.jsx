import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const URL = "http://localhost:9000";
const EquipmentsContext = createContext();

const initialState = {
  equipments: [],
  equipmentStateHistory: [],
  isLoading: false,
  currentEquipment: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "equipments/loaded":
      return { ...state, isLoading: false, equipments: action.payload };
    case "equipmentStateHistory/loaded":
      return {
        ...state,
        isLoading: false,
        equipmentStateHistory: action.payload,
      };
    case "rejected":
      return { ...state, error: action.payload };
    case "equipment/loaded":
      return { ...state, isLoading: false, currentEquipment: action.payload };
    default:
      throw new Error("This is not a valid type");
  }
}

// eslint-disable-next-line react/prop-types
function EquipmentsProvider({ children }) {
  const [
    { equipments, equipmentStateHistory, isLoading, currentEquipment },
    dispath,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchEquipments() {
      try {
        dispath({ type: "loading" });
        const res = await fetch(`${URL}/equipment`);
        const data = await res.json();

        dispath({ type: "equipments/loaded", payload: data });
      } catch (error) {
        dispath({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }

    fetchEquipments();
  }, []);

  const getEquipment = useCallback(
    async function getEquipment(id) {
      if (Number(id) === currentEquipment.id) return;
      try {
        dispath({ type: "loading" });
        const res = await fetch(`${URL}/equipment/${id}`);
        const data = await res.json();

        dispath({ type: "equipment/loaded", payload: data });
      } catch (error) {
        dispath({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    },
    [currentEquipment.id]
  );

  return (
    <EquipmentsContext.Provider
      value={{
        equipments,
        equipmentStateHistory,
        isLoading,
        currentEquipment,
        getEquipment,
      }}
    >
      {children}
    </EquipmentsContext.Provider>
  );
}

function useEquipments() {
  const context = useContext(EquipmentsContext);
  if (context === undefined)
    throw new Error(
      "EquipmentsContext was used outside the EquipmentsProvider"
    );
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { EquipmentsProvider, useEquipments };
