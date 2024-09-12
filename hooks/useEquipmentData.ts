import { useState, useEffect } from 'react';
import equipmentData from '../data/equipment.json';

export const useEquipmentData = () => {
  const [equipments, setEquipments] = useState<any[]>([]);

  useEffect(() => {
    setEquipments(equipmentData);
  }, []);

  return { equipments };
};
