import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IEquipmentStore } from '../../store/equipmentSlice';
import styles from './EquipmentList.module.scss'; // Import the SCSS module
import EquipmentListItem from './EquipmentListItem/EquipmentListItem';

interface EquipmentListProps {
  onEquipmentClick: (equipmentId: string) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ onEquipmentClick }) => {
  const equipmentData = useSelector(
    (state: RootState) => state.equipment.equipments
  );

  const equipmentModels = useSelector(
    (state: RootState) => state.equipment.models
  );

  const equipmentStates = useSelector(
    (state: RootState) => state.equipment.states
  );

  return (
    <div className={styles['equipment-list']}>
      <ul>
        {equipmentData.map((equipment: IEquipmentStore) => {
          const state = equipmentStates.find(
            (s) => s.id === equipment.currentState?.equipmentStateId
          );
          const model = equipmentModels.find(
            (m) => m.id === equipment.equipmentModel
          );
          return (
            <EquipmentListItem
              key={equipment.equipmentId}
              equipmentId={equipment.equipmentModel}
              name={`${equipment.name} - ${state?.name} - ${model?.name}`}
              statusColor={state?.color}
              onClick={() => onEquipmentClick(equipment.equipmentId)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default EquipmentList;
