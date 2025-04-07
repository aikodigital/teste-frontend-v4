import { useState, useEffect, useMemo } from 'react';
import { useEquipment } from './useEquipment';
import { ProductivityData, EarningsData } from '../types/metrics';
import { calculateProductivity, calculateEarnings } from '../utils/metricsCalculator';

export const useEquipmentMetrics = (equipmentId: string | null) => {
  const {
    stateHistory,
    positionHistory,
    equipmentModels,
    equipmentStates,
    selectedDate,
    getEquipmentById,
  } = useEquipment();

  const [productivity, setProductivity] = useState<ProductivityData | null>(null);
  const [earnings, setEarnings] = useState<EarningsData | null>(null);

  // Prepara os dados necessários para os cálculos de métricas
  // Memoizado para evitar recálculos desnecessários em cada renderização
  const equipmentData = useMemo(() => {
    if (!equipmentId) return null;

    const equipment = getEquipmentById(equipmentId);
    if (!equipment) return null;

    const model = equipmentModels.find(m => m.id === equipment.equipmentModelId);
    if (!model) return null;

    const states = stateHistory[equipmentId] || [];
    if (states.length === 0) return null;

    // Identifica o estado "Operando" que é crucial para cálculos de produtividade
    const operatingStateId = equipmentStates.find(s => s.name === "Operando")?.id;
    if (!operatingStateId) return null;

    return {
      equipment,
      model,
      states,
      operatingStateId,
      equipmentStates
    };
  }, [equipmentId, getEquipmentById, equipmentModels, stateHistory, equipmentStates]);

  // Calcula métricas quando os dados relevantes mudam
  useEffect(() => {
    if (!equipmentData) {
      setProductivity(null);
      setEarnings(null);
      return;
    }

    const { model, states, operatingStateId, equipmentStates } = equipmentData;
    
    // Cria mapeamento de taxas horárias por estado para cálculo de ganhos
    const hourlyRates: Record<string, number> = {};
    model.hourlyEarnings.forEach(earning => {
      hourlyRates[earning.equipmentStateId] = earning.value;
    });

    // Delega cálculos complexos para funções utilitárias especializadas
    const productivityData = calculateProductivity(
      states,  
      operatingStateId, 
      selectedDate
    );
    
    const earningsData = calculateEarnings(
      states,
      hourlyRates, 
      equipmentStates, 
      selectedDate
    );

    setProductivity(productivityData);
    setEarnings(earningsData);
  }, [equipmentData, positionHistory, equipmentId, selectedDate]);

  return { productivity, earnings };
};