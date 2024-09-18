import React from 'react';
import styles from './Sidebar.module.scss';
import { EquipmentList } from '../../EquipmentList';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.filters}>
        <h3>Filters</h3>
        {/* Add filter components here */}
      </div>
      <EquipmentList onEquipmentClick={(id) => console.log(id)} />
    </div>
  );
};

export default Sidebar;
