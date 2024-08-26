import { useEffect } from 'react';
import { useEquipmentState } from '../../hooks/useEquipment';
import { useEquipmentContext } from '../../context/EquipmentContext';

const EquipmentState = () => {
  const { setEquipmentState } = useEquipmentContext();

  const fetchEquipmentState = async () => {
    try {
      const equipment = await useEquipmentState();
      setEquipmentState(equipment);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  useEffect(() => {
    fetchEquipmentState();
  }, [setEquipmentState]);

  return null;
};

export default EquipmentState;
