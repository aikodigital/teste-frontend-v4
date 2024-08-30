import { useEffect } from 'react';
import { useEquipmentPositionHistory } from '../../hooks/useEquipment';
import { useEquipmentContext } from '../../context/EquipmentContext';

const EquipmentPositionHistory = () => {
  const { setEquipmentPositionHistory } = useEquipmentContext();

  const fetchEquipmentPositionHistory = async () => {
    try {
      const equipment = await useEquipmentPositionHistory();
      setEquipmentPositionHistory(equipment);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  useEffect(() => {
    fetchEquipmentPositionHistory();
  }, [setEquipmentPositionHistory]);

  return null;
};

export default EquipmentPositionHistory;
