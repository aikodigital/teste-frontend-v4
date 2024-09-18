import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { EquipmentProps, MappedEquipmentDataProps } from "../types/Equipment";
import { EquipmentsPositionHistoryProps } from "../types/EquipmentPositionHistory";
import { EquipmentModelProps } from "../types/EquipmentModel";
import { EquipmentStateProps } from "../types/EquipmentsState";
import { EquipmentStateHistoryProps } from "../types/EquipmentStateHistory";
import { sortDate } from "../lib/utils";

interface ContextProps {
  equipmentList: MappedEquipmentDataProps[];
  setCardSelected: (id: string | undefined) => void;
  cardSelected: any;
}

const ContextDataEquipments = createContext<ContextProps | undefined>(
  undefined
);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [equipmentList, setEquipmentList] = useState<EquipmentProps[]>([]);
  const [equipmentModelList, setEquipmentModelList] = useState<
    EquipmentModelProps[]
  >([]);
  const [equipmentPositionHistory, setEquipmentPositionHistory] = useState<
    EquipmentsPositionHistoryProps[]
  >([]);
  const [equipmentStates, setEquipmentStates] = useState<EquipmentStateProps[]>(
    []
  );
  const [equipmentStateHistory, setEquipmentStateHistory] = useState<
    EquipmentStateHistoryProps[]
  >([]);
  const [cardSelected, setCardSelected] = useState<string | undefined>();

  const fetchEquipmentList = () =>
    fetch("/data/equipment.json", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setEquipmentList(data))
      .catch((error) => console.error(error));

  const fetchEquipmentModelList = () =>
    fetch("/data/equipmentModel.json", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setEquipmentModelList(data))
      .catch((error) => console.error(error));

  const fetchEquipmentPositionHistory = () =>
    fetch("/data/equipmentPositionHistory.json", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setEquipmentPositionHistory(data))
      .catch((error) => console.error(error));

  const fetchEquipmentStates = () =>
    fetch("/data/equipmentState.json", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setEquipmentStates(data))
      .catch((error) => console.error(error));

  const fetchEquipmentStateHistory = () =>
    fetch("/data/equipmentStateHistory.json", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setEquipmentStateHistory(data))
      .catch((error) => console.error(error));

  useEffect(() => {
    Promise.all([
      fetchEquipmentList(),
      fetchEquipmentModelList(),
      fetchEquipmentPositionHistory(),
      fetchEquipmentStates(),
      fetchEquipmentStateHistory(),
    ]);
  }, []);

  const mappedEquipmentData = equipmentList.map((equip) => {
    const equipmentsStatesHistory = equipmentStateHistory.find(
      (equipId) => equipId.equipmentId === equip.id
    )?.states;
    const statesEquipments =
      equipmentsStatesHistory
        ?.map((state: any) => {
          const stateName = equipmentStates.find(
            (stateId) => stateId.id === state.equipmentStateId
          );
          return {
            ...stateName,
            ...state,
            time: new Date(state.date).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        })
        .sort((a, b) => sortDate(a.date, b.date)) || [];

    const positionEquipments = equipmentPositionHistory
      .find((equipId) => equipId.equipmentId === equip.id)
      ?.positions.sort((a, b) => sortDate(a.date, b.date));

    const equipmentModel = equipmentModelList.find(
      (model) => model.id === equip.equipmentModelId
    );

    const [lastState] = statesEquipments || [];

    const [lastPosition] = positionEquipments || [];

    const lastStateDetails = lastState
      ? equipmentStates.find((state) => state.id === lastState.equipmentStateId)
      : null;

    const lastStateDate = lastState
      ? new Date(lastState.date).toLocaleDateString("pt-BR", {})
      : null;
    const lastStateTime = lastState
      ? new Date(lastState.date).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

    return {
      ...equip,
      lastState: {
        ...lastState,
        ...lastStateDetails,
        date: lastStateDate,
        time: lastStateTime,
      },
      lastPosition: {
        ...lastPosition,
      },
      lastStateDetails,
      state: statesEquipments,
      position: positionEquipments,
      equipmentModel: equipmentModel,
    } as MappedEquipmentDataProps;
  });

  const valueMemo = useMemo(
    () => ({
      equipmentList: mappedEquipmentData,
      setCardSelected,
      cardSelected,
    }),
    [mappedEquipmentData, cardSelected]
  );

  return (
    <ContextDataEquipments.Provider value={valueMemo}>
      {children}
    </ContextDataEquipments.Provider>
  );
};

export default ContextDataEquipments;

export const useContextDataEquipments = () => {
  const context = useContext(ContextDataEquipments);

  if (!context) {
    throw new Error(
      "useUserContextDataEquipments must be used within a UserProvider"
    );
  }

  return context;
};
