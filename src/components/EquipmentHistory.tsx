import { useEffect, useState, useCallback, FC } from 'react';
import { useEquipment } from '../hooks/useEquipment';
import HistoryGroup from './history/HistoryGroup';
import { formatDate } from '../utils/dateUtils';
import { HistoryEntry, GroupedHistory } from '../types/history';

const EquipmentHistory: FC = () => {
  // Acessa dados e funções do contexto global de equipamentos
  const {
    selectedEquipmentId,
    stateHistory,
    positionHistory,
    equipmentStates,
    jumpToTime,
  } = useEquipment();

  const [groupedHistory, setGroupedHistory] = useState<GroupedHistory[]>([]);

  // Memoiza a função para evitar recriações desnecessárias em cada renderização
  const getStateName = useCallback((stateId: string): string => {
    const state = equipmentStates.find(s => s.id === stateId);
    return state ? state.name : 'Desconhecido';
  }, [equipmentStates]);

  // Recalcula o histórico quando os dados relevantes mudam
  useEffect(() => {
    if (!selectedEquipmentId) return;

    // Obter histórico de estados
    const states = stateHistory[selectedEquipmentId] || [];
    const positions = positionHistory[selectedEquipmentId] || [];

    // Combinar estados e posições
    const allEntries: HistoryEntry[] = states.map(state => {
      const stateDate = new Date(state.date);
      
      // Algoritmo para encontrar a posição registrada mais próxima temporalmente
      // do momento em que o estado foi alterado, para maior precisão na visualização
      const nearestPosition = positions.reduce((nearest, current) => {
        const currentDate = new Date(current.date);
        const nearestDate = nearest ? new Date(nearest.date) : null;
        
        if (!nearestDate) return current;
        
        const currentDiff = Math.abs(currentDate.getTime() - stateDate.getTime());
        const nearestDiff = Math.abs(nearestDate.getTime() - stateDate.getTime());
        
        return currentDiff < nearestDiff ? current : nearest;
      }, null as (typeof positions[0] | null));
      
      return {
        date: stateDate,
        state: state.equipmentStateId,
        stateName: getStateName(state.equipmentStateId),
        position: nearestPosition ? [nearestPosition.lat, nearestPosition.lon] : null
      };
    });
    
    // Ordenação decrescente para mostrar eventos mais recentes primeiro
    allEntries.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    // Agrupa entradas por dia para melhorar a organização visual e facilitar a navegação
    const grouped: Record<string, HistoryEntry[]> = {};
    
    allEntries.forEach(entry => {
      const dayKey = formatDate(entry.date, 'day');
      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }
      grouped[dayKey].push(entry);
    });
    
    // Transforma o objeto agrupado em array para facilitar a renderização
    const groupedArray: GroupedHistory[] = Object.keys(grouped).map(date => ({
      date,
      entries: grouped[date]
    }));
    
    setGroupedHistory(groupedArray);
  }, [selectedEquipmentId, stateHistory, positionHistory, equipmentStates, getStateName]);

  // Adapta a função jumpToTime para o formato esperado pelo componente HistoryGroup
  const handleSelectEntry = useCallback((date: Date) => {
    jumpToTime('specific', date);
  }, [jumpToTime]);
  
  // Evita renderização desnecessária quando nenhum equipamento está selecionado
  if (!selectedEquipmentId) return null;
  
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Histórico de Estados
      </h3>
      
      <div 
        className="overflow-y-auto max-h-[300px] pr-1"
        role="log"
        aria-label="Histórico de estados do equipamento"
      >
        {groupedHistory.map((group, groupIndex) => (
          <HistoryGroup 
            key={groupIndex}
            group={group}
            onSelectEntry={handleSelectEntry}
          />
        ))}
      </div>
    </div>
  );
};

export default EquipmentHistory;