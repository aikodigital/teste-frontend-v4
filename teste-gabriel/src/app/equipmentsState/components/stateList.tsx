import { EquipmentState } from '@/types/EquipmentState';
import { EquipmentStateHistory } from '@/types/EquipmentStateHistory';
import React, { useEffect, useState } from 'react';


const EquipmentStateHistoryComponent: React.FC<{ equipmentId: string }> = ({ equipmentId }) => {
    
    const [stateHistory, setStateHistory] = useState<EquipmentStateHistory | null>(null);
    const [equipmentStates, setEquipmentStates] = useState<EquipmentState[]>([]);
  
    useEffect(() => {
      const fetchStateHistory = async () => {
        try {
          const response = await fetch('/data/equipmentStateHistory.json');
          const data: EquipmentStateHistory[] = await response.json();
  
          const history = data.find(item => item.equipmentId === equipmentId);
          setStateHistory(history || null);
        } catch (error) {
          console.error('Erro ao carregar o histórico:', error);
        }
      };
  
      const fetchEquipmentStates = async () => {
        try {
          const response = await fetch('/data/equipmentState.json');
          const data: EquipmentState[] = await response.json();
          setEquipmentStates(data);
        } catch (error) {
          console.error('Erro ao carregar os estados dos equipamentos:', error);
        }
      };
  
      fetchStateHistory();
      fetchEquipmentStates();
    }, [equipmentId]);
  
    if (!stateHistory) {
      return <p>Histórico de estados não encontrado.</p>;
    }
  
    return (
      <div>
        <h3>Histórico de Estados do Equipamento</h3>
        <ul>
          {stateHistory.states.map((state, index) => {
            const stateDetails = equipmentStates.find(s => s.id === state.equipmentStateId);
            return (
              <li key={index}>
                <strong>Data:</strong> {new Date(state.date).toLocaleString()}<br />
                <strong>Estado:</strong> {stateDetails?.name || 'Desconhecido'}<br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  
  export default EquipmentStateHistoryComponent;