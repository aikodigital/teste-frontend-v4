import { FC, ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | ReactNode;
  // Permite personalização de cores para destacar diferentes tipos de métricas
  valueColor?: string;
  // Informações contextuais opcionais para complementar o valor principal
  details?: string | ReactNode;
}

// Componente reutilizável para exibir métricas com formato consistente
export const MetricCard: FC<MetricCardProps> = ({ 
  label, 
  value, 
  valueColor = 'text-gray-900',
  details 
}) => {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex items-end">
        {/* Destaque visual para o valor principal da métrica */}
        <span className={`text-2xl font-bold ${valueColor}`}>
          {value}
        </span>
        {/* Informações adicionais condicionais para contextualizar o valor principal */}
        {details && (
          <span className="text-xs text-gray-500 ml-2 mb-1">
            {details}
          </span>
        )}
      </div>
    </div>
  );
};