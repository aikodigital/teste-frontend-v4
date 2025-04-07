import { FC } from 'react';
import { HistoryEntry as HistoryEntryType } from '../../types/history';
import { formatDate } from '../../utils/dateUtils';
import { getStateStyles } from '../../utils/stateUtils';

interface HistoryEntryProps {
  // Dados do evento histórico a ser exibido
  entry: HistoryEntryType;
  // Callback para navegação temporal ao clicar no evento
  onClick: () => void;
}

const HistoryEntry: FC<HistoryEntryProps> = ({ entry, onClick }) => {
  // Obtém cores dinâmicas baseadas no estado para feedback visual consistente
  const { stateColor, textColor } = getStateStyles(entry.stateName);
  
  return (
    <div 
      className={`p-2 rounded-md ${stateColor} cursor-pointer hover:opacity-90 transition-opacity`}
      onClick={onClick}
      role="button"
      // Atributo ARIA para melhorar acessibilidade e fornecer contexto para leitores de tela
      aria-label={`Estado ${entry.stateName} em ${formatDate(entry.date)}`}
    >
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${textColor}`}>
          {entry.stateName}
        </span>
        <span className="text-xs text-gray-500">
          {formatDate(entry.date)}
        </span>
      </div>
    </div>
  );
};

export default HistoryEntry;