import React from "react";
import { useEffect } from "react";
import {
  equipmentStateHistories,
  equipmentStates,
  equipments,
} from "./dataLoader";

interface StateHistoryModalProps {
  show: boolean;
  onClose: () => void;
  equipmentId: string;
}

const StateHistoryModal: React.FC<StateHistoryModalProps> = ({
  show,
  onClose,
  equipmentId,
}) => {
  const [stateHistory, setStateHistory] = React.useState<any[]>([]);
  const [filteredHistory, setFilteredHistory] = React.useState<any[]>([]);
  const [equipmentName, setEquipmentName] = React.useState<string>("");
  const [selectedStatus, setSelectedStatus] = React.useState<string | "All">(
    "All"
  );
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchStateHistory = () => {
      const history = equipmentStateHistories.find(
        (h) => h.equipmentId === equipmentId
      );
      if (history) {
        const detailedHistory = history.states.map((s: any) => ({
          ...s,
          stateName:
            equipmentStates.find((state) => state.id === s.equipmentStateId)
              ?.name || "Unknown",
          stateColor:
            equipmentStates.find((state) => state.id === s.equipmentStateId)
              ?.color || "#000000",
        }));
        setStateHistory(detailedHistory);
      }

      // Get the equipment name
      const equipment = equipments.find((e) => e.id === equipmentId);
      if (equipment) {
        setEquipmentName(equipment.name);
      }
    };

    fetchStateHistory();
  }, [equipmentId]);

  useEffect(() => {
    let updatedHistory = [...stateHistory];

    // Filtrar por status
    if (selectedStatus !== "All") {
      updatedHistory = updatedHistory.filter(
        (entry) => entry.stateName === selectedStatus
      );
    }

    // Ordenar por data e hora
    updatedHistory.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredHistory(updatedHistory);
  }, [stateHistory, selectedStatus, sortOrder]);

  if (!show) return null;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return {
      datePart: `${day}/${month}/${year}`,
      timePart: `${hours}:${minutes}:${seconds}`,
    };
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };

  return (
    <>
      <div className="fixed inset-0 translate-y-5 bg-opacity-75 flex items-center justify-center z-50">
        <div
          onClick={onClose}
          className="bg-slate-800 w-screen h-screen -translate-y-5 fixed z-[-1] opacity-50 cursor-pointer"
        ></div>
        <div className="bg-slate-100 p-4 rounded-b-lg shadow-lg w-[85vw] max-h-[90vh] overflow-x-hidden overflow-scroll">
          <div className="fixed shadow-lg top-4 left-1/2 -translate-x-1/2 py-1 px-10 w-[85vw] text-center rounded-t-md bg-slate-200 ">
            <button
              onClick={onClose}
              className="font-bold text-slate-700 fixed top-1 right-3"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-slate-700 pt-2">
              Histórico de estado: {equipmentName}
            </h2>
            <div className="my-4 flex flex-col md:flex-row lg:flex-row gap-4 justify-start items-center w-full">
              <div className="flex items-center gap-4 w-full">
                <label className="text-slate-700 lg:mr-0 mr-auto">
                  Filtrar por estado:
                </label>
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="p-2 border rounded text-slate-700 "
                >
                  <option value="All">Todos</option>
                  {equipmentStates.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4  w-full">
                <label className="text-slate-700 lg:mr-0 mr-auto">
                  Filtrar ordem:
                </label>
                <select
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="p-2 border rounded text-slate-700"
                >
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </select>
              </div>
            </div>
          </div>

          <ul className="space-y-2 text-slate-700 mt-32 md:mt-20">
            {filteredHistory.map((entry, index) => (
              <li key={index} className="flex justify-around items-center">
                <span>
                  <span className="font-bold">
                    {" "}
                    {formatDateTime(entry.date).datePart}
                  </span>

                  <br />
                  {formatDateTime(entry.date).timePart}
                </span>
                <div className="w-[100%] h-[1px] bg-slate-200"></div>
                <span
                  className="font-semibold pl-2"
                  style={{ color: entry.stateColor }}
                >
                  {entry.stateName}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StateHistoryModal;
