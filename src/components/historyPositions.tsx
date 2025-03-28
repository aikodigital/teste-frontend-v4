/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/historyPositions.css';
import { fetchData } from '../utils/utils';
import { useEquipmentState } from './../utils/useEquipmentState';

const HistoryPositions: React.FC<{ selectedEquipment: any }> = ({ selectedEquipment }) => {
  const { equipmentStates, setEquipmentStates } = useEquipmentState();

  useEffect(() => {
    const loadData = async () => {
      const { stateData } = await fetchData();
      setEquipmentStates(stateData);
    };
    loadData();
  }, [setEquipmentStates]);

  // Função para formatar a data e hora
  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('pt-BR', {
      weekday: 'short',  // Exibe o dia da semana (opcional)
      year: 'numeric',   // Exibe o ano
      month: 'short',    // Exibe o mês abreviado
      day: 'numeric',    // Exibe o dia do mês
      hour: '2-digit',   // Exibe a hora
      minute: '2-digit', // Exibe os minutos
      second: '2-digit', // Exibe os segundos
      hour12: true       // Formato de 24 horas
    });
  };

  // Função para obter o estado do equipamento
  const ready = (codeState: string) => {
    if (equipmentStates && equipmentStates.length > 0) {
      const state = equipmentStates.find(state => state.id === codeState);
      return state ? state : { name: 'Estado desconhecido', color: 'black' };
    }
    return { name: 'Carregando...', color: 'gray' };
  };

  if (!selectedEquipment?.positionHistory || selectedEquipment.positionHistory.length === 0) {
    return <p className="text-center text-muted">Sem histórico de posições disponíveis.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="history-container">
        <h5>Histórico de Funcionamento:</h5>
        <div>
          {selectedEquipment.stateHistory.map((position: any, index: number) => {
            const formattedDateTime = formatDateTime(position.date); // Usando a função formatDateTime

            return (
              <div key={`${index}`} className="history-entry">
                <p><strong>Data e Hora:</strong> {formattedDateTime}</p>
                <p style={{ color: ready(position.equipmentStateId).color }}>
                  <strong>Estado de funcionamento:</strong> {ready(position.equipmentStateId).name}
                </p>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryPositions;
