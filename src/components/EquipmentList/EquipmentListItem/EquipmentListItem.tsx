import React from 'react';
import styles from './EquipmentListItem.module.scss';
import {
  LocalShipping,
  Agriculture,
  Construction,
  HelpCenterOutlined,
} from '@mui/icons-material';

interface EquipmentListItemProps {
  equipmentId: string | null;
  name: string;
  statusColor?: string;
  onClick: () => void;
}

const equipmentIconMap: { [key: string]: React.ReactNode } = {
  'a3540227-2f0e-4362-9517-92f41dabbfdf': <LocalShipping fontSize="large" />, // Caminhão de carga
  'a4b0c114-acd8-4151-9449-7d12ab9bf40f': <Agriculture fontSize="large" />, // Harvester
  '9c3d009e-0d42-4a6e-9036-193e9bca3199': <Construction fontSize="large" />, // Garra traçadora
};

const EquipmentListItem: React.FC<EquipmentListItemProps> = ({
  equipmentId,
  name,
  statusColor,
  onClick,
}) => {
  const equipment = equipmentId ? (
    equipmentIconMap[equipmentId]
  ) : (
    <HelpCenterOutlined />
  );
  return (
    <li className={styles['equipment-list-item']} onClick={onClick}>
      <div
        className={styles['icon-wrapper']}
        style={{
          borderColor: statusColor ?? '#OOO',
          color: statusColor ?? '#OOO',
        }}
      >
        {equipment}
      </div>
      <span className={styles['equipment-name']}>{name}</span>
    </li>
  );
};

export default EquipmentListItem;
