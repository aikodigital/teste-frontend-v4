import React from 'react';
import { EquipmentStateHistory, EquipmentStateInfo } from '../../types';
import EquipmentStateHistoryList from './equipmentStateHistoryList';

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

  return (
    <div>
      <h2>Histórico de Estados</h2>

      <EquipmentStateHistoryList
        equipmentId={equipmentId}
        stateHistory={stateHistory}
        stateInfoList={stateInfoList}
      />

    </div>
  );
};

export default EquipmentStateHistorySection;