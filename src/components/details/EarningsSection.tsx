import { FC } from 'react';
import { EarningsData } from '../../types/metrics';
import { MetricCard } from './MetricCard';
import { formatCurrency } from '../../utils/formatters';

interface EarningsSectionProps {
  // Permite renderização condicional baseada na disponibilidade dos dados
  earnings: EarningsData | null;
}

const EarningsSection: FC<EarningsSectionProps> = ({ earnings }) => {
  // Evita renderização quando não há dados disponíveis
  if (!earnings) return null;

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Ganhos</h3>
      
      {/* Exibe valores totais de ganhos em dois períodos diferentes */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <MetricCard
          label="Até a data atual:"
          value={formatCurrency(earnings.currentDate)}
          valueColor="text-green-600"
        />
        
        <MetricCard
          label="Período total:"
          value={formatCurrency(earnings.totalPeriod)}
          valueColor="text-emerald-600"
        />
      </div>
      
      {/* Seção adicional para detalhar ganhos por tipo de estado */}
      <div className="mt-2">
        <p className="text-xs text-gray-500 mb-1">Detalhamento:</p>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <StateEarningCard 
            state="Operando" 
            value={earnings.breakdown.operating} 
            colorScheme="green" 
          />
          <StateEarningCard 
            state="Parado" 
            value={earnings.breakdown.stopped} 
            colorScheme="yellow" 
          />
          <StateEarningCard 
            state="Manutenção" 
            value={earnings.breakdown.maintenance} 
            colorScheme="red" 
          />
        </div>
      </div>
    </div>
  );
};

interface StateEarningCardProps {
  state: string;
  value: number;
  // Esquema de cores diferenciado para facilitar identificação visual dos estados
  colorScheme: 'green' | 'yellow' | 'red';
}

// Componente especializado para exibir ganhos por estado com código de cores
// para facilitar a identificação visual rápida
const StateEarningCard: FC<StateEarningCardProps> = ({ state, value, colorScheme }) => {
  // Map colorScheme to specific Tailwind classes
  const bgColorClass = {
    'green': 'bg-green-50 border-green-100',
    'yellow': 'bg-yellow-50 border-yellow-100',
    'red': 'bg-red-50 border-red-100'
  }[colorScheme];
  
  const textColorClass = {
    'green': 'text-green-600',
    'yellow': 'text-yellow-600',
    'red': 'text-red-600'
  }[colorScheme];

  return (
    <div className={`p-2 rounded border ${bgColorClass}`}>
      <p className="text-xs text-gray-500">{state}</p>
      <p className={`font-medium ${textColorClass}`}>{formatCurrency(value)}</p>
    </div>
  );
};

export default EarningsSection;