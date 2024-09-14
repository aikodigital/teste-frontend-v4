import React, { useState } from 'react';
import { EquipmentStateHistory, EquipmentStateInfo, EquipmentState } from '../../types';

interface EquipmentStateHistoryListProps {
  equipmentId: string;
  stateHistory: EquipmentStateHistory[];
  stateInfoList: EquipmentStateInfo[];
}

const EquipmentStateHistoryList: React.FC<EquipmentStateHistoryListProps> = ({
  equipmentId,
  stateHistory,
  stateInfoList,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Encontra o histórico de estados do equipamento selecionado
  const equipmentHistory = stateHistory.find((history) => history.equipmentId === equipmentId);

  if (!equipmentHistory) {
    return <p>Nenhum histórico de estados disponível para este equipamento.</p>;
  }

  // Calcular o número total de páginas
  const totalPages = Math.ceil(equipmentHistory.states.length / itemsPerPage);

  // Definir o intervalo de itens a serem exibidos na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStates = equipmentHistory.states.slice(startIndex, startIndex + itemsPerPage);

  // Função para mudar de página
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <ul className="list-group">
        {paginatedStates.map((state: EquipmentState, index: number) => {

          // Encontrar as informações do estado correspondente
          const stateInfo = stateInfoList.find((info) => info.id === state.equipmentStateId);

          if (!stateInfo) return null;

          return (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <strong style={{ color: stateInfo.color }}>{stateInfo.name}</strong>
              </span>
              <span className="badge" style={{ backgroundColor: stateInfo.color }}>
                {/* Cor do estado */}
              </span>
              <span>{new Date(state.date).toLocaleString()}</span>
            </li>
          );
        })}
      </ul>

      {/* Controles de paginação */}
      <nav aria-label="Page navigation" className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={goToPreviousPage}>
              Anterior
            </button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">
              Página {currentPage} de {totalPages}
            </span>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={goToNextPage}>
              Próxima
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default EquipmentStateHistoryList;