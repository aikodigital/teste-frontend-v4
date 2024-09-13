import React, { useState } from "react";
import Modal from "react-modal";
import "./EquipmentModal.scss";
import { Equipment, State } from "../../types/Equipment";
import TimeInputFilter from "../TimeInputFilter/TimeInputFilter";

Modal.setAppElement("#root");

interface EquipmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedEquipmentId: string | null;
  equipmentData: Equipment[];
  equipmentStates: Record<string, State>;
  stateHistory: Record<string, { date: string; equipmentStateId: string }[]>;
}

const EquipmentModal: React.FC<EquipmentModalProps> = ({
  isOpen,
  onRequestClose,
  selectedEquipmentId,
  equipmentData,
  equipmentStates,
  stateHistory,
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const matchesHour = (stateDate: Date) => {
    let hour = stateDate.getHours();
    const minutes = stateDate.getMinutes();
    const amPm = hour >= 12 ? "PM" : "AM";

    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;

    const hourMatches =
      !selectedHour || hour === parseInt(selectedHour.split(":")[0], 10);
    const amPmMatches = !selectedAmPm || amPm === selectedAmPm;

    const minuteMatches = selectedHour.includes(":")
      ? minutes === parseInt(selectedHour.split(":")[1], 10)
      : true;

    return hourMatches && amPmMatches && minuteMatches;
  };

  const filteredStateHistory = selectedStateHistory.filter((state) => {
    const stateDate = new Date(state.date);

    const filterByState = selectedStateId
      ? state.equipmentStateId === selectedStateId
      : true;

    const filterByDate = selectedDate
      ? formatDate(state.date) === selectedDate
      : true;

    const filterByHour = matchesHour(stateDate);

    return filterByState && filterByDate && filterByHour;
  });

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
          <p className="mb-5">
            Estado atual:{" "}
            {getCurrentState(selectedEquipment.id)?.name || "Desconhecido"}
          </p>

          <h4>Filtro de Estado:</h4>

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

          <h4>Filtro de Data:</h4>

          <input
            type="text"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-filter"
            placeholder="Data (dd/mm/yyyy)"
          />

          <h4>Filtro de Tempo:</h4>

          <TimeInputFilter
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
            selectedAmPm={selectedAmPm}
            setSelectedAmPm={setSelectedAmPm}
          />

          <h4 className="mt-5">Histórico de Estados:</h4>

          <div className="state-history">
            {filteredStateHistory.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStateHistory.map((state, index) => (
                    <tr key={index}>
                      <td>{new Date(state.date).toLocaleString()}</td>
                      <td>
                        {equipmentStates[state.equipmentStateId]?.name ||
                          "Desconhecido"}
                      </td>
                    </tr>
                  ))}
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
