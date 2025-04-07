import { FC } from 'react';
import { ProductivityData } from '../../types/metrics';
import { MetricCard } from './MetricCard';
import { formatPercentage } from '../../utils/formatters';

interface ProductivitySectionProps {
  // Permite renderização condicional baseada na disponibilidade dos dados
  productivity: ProductivityData | null;
}

const ProductivitySection: FC<ProductivitySectionProps> = ({ productivity }) => {
  // Evita renderização quando não há dados disponíveis
  if (!productivity) return null;

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Produtividade</h3>
      
      {/* Layout em grid para organizar métricas lado a lado em telas maiores */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          label="Até a data atual:"
          value={formatPercentage(productivity.currentDate.percentage)}
          valueColor="text-blue-600"
          // Exibe detalhes sobre as horas para contextualizar a porcentagem
          details={`(${productivity.currentDate.operatingHours.toFixed(1)}h / ${productivity.currentDate.totalHours.toFixed(1)}h)`}
        />
        
        <MetricCard
          label="Período total:"
          value={formatPercentage(productivity.totalPeriod.percentage)}
          valueColor="text-indigo-600"
          details={`(${productivity.totalPeriod.operatingHours.toFixed(1)}h / ${productivity.totalPeriod.totalHours.toFixed(1)}h)`}
        />
      </div>
    </div>
  );
};

export default ProductivitySection;