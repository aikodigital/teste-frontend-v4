import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import "./EquipmentModal.scss";
import { Equipment, State } from "../../types/Equipment";
import TimeInputFilter from "../TimeInputFilter/TimeInputFilter";
import DateFilter from "../DateFilter/DateFilter";

Modal.setAppElement("#root");

interface EquipmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedEquipmentId: string | null;
  equipmentData: Equipment[];
  equipmentStates: Record<string, State>;
  stateHistory: Record<string, { date: string; equipmentStateId: string }[]>;
  earnings: string | number;
}

const EquipmentModal: React.FC<EquipmentModalProps> = ({
  isOpen,
  onRequestClose,
  selectedEquipmentId,
  equipmentData,
  equipmentStates,
  stateHistory,
  earnings,
}) => {
  const [selectedStateId, setSelectedStateId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedAmPm, setSelectedAmPm] = useState<string>("AM");

  const getCurrentState = (equipmentId: string) => {
    const history = stateHistory[equipmentId];
    if (!history || history.length === 0) return null;
    const latestStateId = history[history.length - 1].equipmentStateId;
    return equipmentStates[latestStateId];
  };

  const selectedEquipment = selectedEquipmentId
    ? equipmentData.find((eq) => eq.id === selectedEquipmentId)
    : null;

  const selectedStateHistory = selectedEquipmentId
    ? stateHistory[selectedEquipmentId] || []
    : [];

  const parseDateString = (dateString: string) => {
    const [month, day, year] = dateString
      .split("/")
      .map((part) => parseInt(part, 10));
    return { day, month, year };
  };

  const matchesHour = (stateDate: Date) => {
    if (!selectedHour) return true;

    const stateHour = stateDate.getHours();
    const selectedHourNumber = parseInt(selectedHour, 10);

    if (isNaN(selectedHourNumber)) return true;

    let adjustedHour = selectedHourNumber;
    if (selectedAmPm === "PM" && selectedHourNumber < 12) {
      adjustedHour += 12;
    } else if (selectedAmPm === "AM" && selectedHourNumber === 12) {
      adjustedHour = 0;
    } else if (selectedAmPm === "PM" && selectedHourNumber === 12) {
      adjustedHour = 12;
    }

    return stateHour === adjustedHour;
  };

  const filterData = useCallback(
    (date: string) => {
      const { day, month, year } = parseDateString(date);

      return selectedStateHistory.filter((state) => {
        const stateDate = new Date(state.date);
        const stateDay = stateDate.getDate();
        const stateMonth = stateDate.getMonth() + 1;
        const stateYear = stateDate.getFullYear();

        const dayMatches = isNaN(day) || stateDay === day;
        const monthMatches = isNaN(month) || stateMonth === month;
        const yearMatches = isNaN(year) || stateYear === year;

        const filterByState = selectedStateId
          ? state.equipmentStateId === selectedStateId
          : true;

        const filterByDate = dayMatches && monthMatches && yearMatches;
        const filterByHour = matchesHour(stateDate);

        return filterByState && filterByDate && filterByHour;
      });
    },
    [selectedStateHistory, selectedStateId, selectedHour, selectedAmPm]
  );

  const uniqueStates = Array.from(
    new Set(selectedStateHistory.map((state) => state.equipmentStateId))
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detalhes do Equipamento"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="font-bold text-center mb-5">Detalhes do Equipamento</h2>
      {selectedEquipment && (
        <div>
          <h3>{selectedEquipment.name || "Equipamento Desconhecido"}</h3>
          <p>Modelo: {selectedEquipment.equipmentModelId}</p>
          <p>
            Estado atual:{" "}
            {getCurrentState(selectedEquipment.id)?.name || "Desconhecido"}
          </p>
          <p>Ganho Total: {earnings}</p>
          <h4 className="mt-5">Filtrar Estado:</h4>

          <select
            value={selectedStateId}
            onChange={(e) => setSelectedStateId(e.target.value)}
            className="select-filter"
          >
            <option value="">Todos os Estados</option>
            {uniqueStates.map((stateId) => (
              <option key={stateId} value={stateId}>
                {equipmentStates[stateId]?.name || "Estado Desconhecido"}
              </option>
            ))}
          </select>

          <div className="timeAndDateInputs">
            <DateFilter
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              filterData={(date: string) => filterData(date)}
            />
            <div className="timeInputContainer">
              <h4>Filtrar Tempo:</h4>
              <TimeInputFilter
                selectedHour={selectedHour}
                setSelectedHour={setSelectedHour}
                selectedAmPm={selectedAmPm}
                setSelectedAmPm={setSelectedAmPm}
              />
            </div>
          </div>

          <h4 className="mt-5">Histórico de Estados:</h4>

          <div className="state-history">
            {filterData(selectedDate).length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData(selectedDate).map((state, index) => {
                    const stateDate = new Date(state.date);
                    const formattedDate = stateDate.toLocaleDateString("en-US");
                    const formattedTime = stateDate.toLocaleTimeString(
                      "en-US",
                      { hour: "2-digit", minute: "2-digit", hour12: true }
                    );

                    return (
                      <tr key={index}>
                        <td>{formattedDate}</td>
                        <td>{formattedTime}</td>
                        <td
                          style={{
                            color:
                              equipmentStates[state.equipmentStateId]?.color ||
                              "#000000",
                            fontWeight: "bold",
                          }}
                        >
                          {equipmentStates[state.equipmentStateId]?.name ||
                            "Desconhecido"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>Nenhum estado correspondente encontrado.</p>
            )}
          </div>

          <button className="close-button" onClick={onRequestClose}>
            Fechar
          </button>
        </div>
      )}
    </Modal>
  );
};

export default EquipmentModal;
