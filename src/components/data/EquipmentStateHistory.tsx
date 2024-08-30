import { useEffect } from 'react';
import { useEquipmentStateHistory } from '../../hooks/useEquipment';
import { useEquipmentContext } from '../../context/EquipmentContext';

const EquipmentStateHistory = () => {
  const { setEquipmentStateHistory } = useEquipmentContext();

  const fetchEquipmentStateHistory = async () => {
    try {
      const equipment = await useEquipmentStateHistory();
      setEquipmentStateHistory(equipment);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  useEffect(() => {
    fetchEquipmentStateHistory();
  }, [setEquipmentStateHistory]);

  return null;
};

export default EquipmentStateHistory;
