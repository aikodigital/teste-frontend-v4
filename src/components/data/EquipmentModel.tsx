import { useEffect } from 'react';
import { useEquipment } from '../../hooks/useEquipment';
import { useEquipmentContext } from '../../context/EquipmentContext';

const EquipmentsModel = () => {
  const { setEquipmentModel } = useEquipmentContext();

  const fetchEquipmentsModel = async () => {
    try {
      const equipment = await useEquipment();
      setEquipmentModel(equipment);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  useEffect(() => {
    fetchEquipmentsModel();
  }, [setEquipmentModel]);

  return null;
};

export default EquipmentsModel;
