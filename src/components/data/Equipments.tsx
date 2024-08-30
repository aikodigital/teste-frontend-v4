import { useEffect } from 'react';
import { useEquipment } from '../../hooks/useEquipment';
import { useEquipmentContext } from '../../context/EquipmentContext';

const Equipments = () => {
  const { setEquipment } = useEquipmentContext();

  const fetchEquipments = async () => {
    try {
      const equipment = await useEquipment();
      setEquipment(equipment);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, [setEquipment]);

  return null;
};

export default Equipments;
