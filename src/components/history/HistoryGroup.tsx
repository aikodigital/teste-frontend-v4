import { FC } from 'react';
import HistoryEntry from './HistoryEntry';
import { GroupedHistory } from '../../types/history';


interface HistoryGroupProps {
  // Grupo de eventos históricos organizados por data
  group: GroupedHistory;
  // Callback para atualizar a linha do tempo quando um evento for selecionado
  onSelectEntry: (date: Date) => void;
}

const HistoryGroup: FC<HistoryGroupProps> = ({ group, onSelectEntry }) => {
  return (
    <div className="mb-3">
      {/* Cabeçalho fixo durante a rolagem para manter o contexto temporal visível */}
      <h4 className="text-xs font-medium text-gray-500 mb-1 sticky top-0 bg-white py-1">
        {group.date}
      </h4>
      
      <div className="space-y-2">
        {group.entries.map((entry, entryIndex) => (
          <HistoryEntry 
            key={entryIndex}
            entry={entry}
            // Passa apenas a data relevante para o callback de seleção
            onClick={() => onSelectEntry(entry.date)}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryGroup;