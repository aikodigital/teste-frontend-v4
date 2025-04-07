import { useEffect, useState } from 'react';
import { useEquipment } from '../hooks/useEquipment';
import EquipmentHistory from './EquipmentHistory';
import ProductivitySection from './details/ProductivitySection';
import EarningsSection from './details/EarningsSection';
import { useEquipmentMetrics } from '../hooks/useEquipmentMetrics';
import { CloseButton } from './ui/CloseButton';

const EquipmentDetails = () => {
  // Obtém dados e funções do contexto global de equipamentos
  const {
    selectedEquipmentId,
    closeEquipmentHistory,
    getEquipmentName,
  } = useEquipment();

  // Estado para controlar a animação de fade-in/fade-out
  const [isVisible, setIsVisible] = useState(false);
  const { productivity, earnings } = useEquipmentMetrics(selectedEquipmentId);

  // Implementa um atraso na transição para melhorar a experiência visual
  // quando o painel de detalhes é aberto ou fechado
  useEffect(() => {
    if (selectedEquipmentId) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [selectedEquipmentId]);

  if (!selectedEquipmentId) return null;

  // Define classes CSS para animação de transição baseada na visibilidade
  const fadeClass = isVisible 
    ? "opacity-100 transition-opacity duration-300 ease-in" 
    : "opacity-0 transition-opacity duration-300 ease-out";

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm p-3 ${fadeClass}`}
      aria-label="Equipment details"
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {getEquipmentName(selectedEquipmentId)}
        </h2>
        <CloseButton onClick={closeEquipmentHistory} />
      </div>

      {/* Componentes separados para cada seção de métricas para melhor manutenção */}
      <ProductivitySection productivity={productivity} />
      <EarningsSection earnings={earnings} />
      <EquipmentHistory />
    </div>
  );
};

export default EquipmentDetails;