import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import EquipmentList from '../../components/EquipmentList/EquipmentList';
import Map from '../../components/map/Map';
import { useDispatch } from 'react-redux';
import {
  fetchEquipments,
  fetchModels,
  fetchStates,
} from '../../store/equipmentThunks';
import { AppDispatch } from '../../store/store';
import { EquipmentDetails } from '../../components/common/EquipmentsDetails';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchStates());
    dispatch(fetchModels());
    dispatch(fetchEquipments());
  }, [dispatch]);

  const handleEquipmentClick = (equipmentId: string) => {
    setSelectedEquipment(equipmentId);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedEquipment(null);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.mapContainer}>
        <Map selectedEquipment={selectedEquipment} />
      </div>
      <div className={styles.sidebar}>
        <EquipmentList onEquipmentClick={handleEquipmentClick} />
        {isSidebarOpen && (
          <EquipmentDetails
            equipmentId={selectedEquipment}
            onClose={handleCloseSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
