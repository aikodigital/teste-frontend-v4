import React from 'react';
import { EquipmentStateHistory, EquipmentStateInfo } from '../../types';
import EquipmentStateHistoryList from './equipmentStateHistoryList';
import { useEquipmentData } from '../../contexts/EquipmentDataContext';

interface EquipmentStateHistorySectionProps {
  equipmentId: string;
  stateHistory: EquipmentStateHistory[];
  stateInfoList: EquipmentStateInfo[];
}

const EquipmentStateHistorySection: React.FC<EquipmentStateHistorySectionProps> = ({
  equipmentId,
  stateHistory,
  stateInfoList,
}) => {
  const { equipmentList } = useEquipmentData();
  const equipment = equipmentList.find(eq => eq.id === equipmentId);

  return (
    <>
      <h1>Histórico do Equipamento {equipment?.name} </h1>
      <p>
        Você está vendo o histórico de posições e estados de um
        equipamento. Clique <a href={`/`}>aqui</a> para voltar para a Lista de Equipamentos.
      </p>

      <div>
        <h2>Histórico de Estados</h2>

        <EquipmentStateHistoryList
          equipmentId={equipmentId}
          stateHistory={stateHistory}
          stateInfoList={stateInfoList}
        />

      </div>
    </>
  );
};

export default EquipmentStateHistorySection;