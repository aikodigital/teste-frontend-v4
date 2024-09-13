import React, { useState } from "react";
import Modal from "react-modal";
import "./EquipmentModal.scss";
import { Equipment, State } from "../../types/Equipment";

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
  const [selectedStateId, setSelectedStateId] = useState<string>(""); // Estado para armazenar o estado selecionado no select
  const [selectedDate, setSelectedDate] = useState<string>(""); // Estado para armazenar a data selecionada
  const [selectedHour, setSelectedHour] = useState<string>(""); // Estado para armazenar a hora selecionada
  const [selectedAmPm, setSelectedAmPm] = useState<string>("AM"); // Estado para armazenar AM ou PM

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

  // Função para converter a data no formato "dd/mm/yyyy"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para verificar se a hora e minutos batem com o filtro inserido pelo usuário
  const matchesHour = (stateDate: Date) => {
    let hour = stateDate.getHours();
    const minutes = stateDate.getMinutes();
    const amPm = hour >= 12 ? "PM" : "AM";
    
    if (hour > 12) hour -= 12; // Converte de 24h para 12h
    if (hour === 0) hour = 12;  // Converte 00:00 para 12:00 AM
    
    // Filtro de hora e AM/PM
    const hourMatches = (!selectedHour || hour === parseInt(selectedHour.split(":")[0], 10));
    const amPmMatches = (!selectedAmPm || amPm === selectedAmPm);

    // Verifica minutos, se foram fornecidos
    const minuteMatches = selectedHour.includes(":") ? 
      minutes === parseInt(selectedHour.split(":")[1], 10) : 
      true;

    return hourMatches && amPmMatches && minuteMatches;
  };

  // Função para lidar com a entrada de hora e formatá-la automaticamente
  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove caracteres que não são números

    // Formatar automaticamente no formato HH:MM
    if (value.length > 2 && value.length <= 4) {
      value = value.slice(0, 2) + ":" + value.slice(2); // Adiciona o primeiro ":"
    } else if (value.length > 4) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4); // Adiciona ambos ":"
    }

    // Limitar o número de caracteres
    if (value.length <= 5) {
      setSelectedHour(value);
    }
  };

  // Filtrando o histórico com base no estado, data e hora
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

  // Obter uma lista única de estados do histórico
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
      <h2>Detalhes do Equipamento</h2>
      {selectedEquipment && (
        <div>
          <h3>{selectedEquipment.name || "Equipamento Desconhecido"}</h3>
          <p>Modelo: {selectedEquipment.equipmentModelId}</p>
          <p>
            Estado atual:{" "}
            {getCurrentState(selectedEquipment.id)?.name || "Desconhecido"}
          </p>
          <h4>Histórico de Estados:</h4>

          {/* Select para filtrar por estado */}
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

          <input
            type="text"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-filter"
            placeholder="Data (dd/mm/yyyy)"
          />

          <div className="time-filter-container">
            <input
              type="text"
              value={selectedHour}
              onChange={handleTimeInputChange}
              className="hour-filter"
              placeholder="Hora (HH:MM)"
              maxLength={5} // Limitar a 5 caracteres para HH:MM
            />
            <select
              value={selectedAmPm}
              onChange={(e) => setSelectedAmPm(e.target.value)}
              className="ampm-filter"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

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
