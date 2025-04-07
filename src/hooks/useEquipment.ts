import { useCallback, useEffect, useState } from 'react';
import { IEquipment } from '../interfaces/equipment';
import { fetchAllEquipments } from '../services/equipment';

const useEquipment = () => {
  const [equipmentData, setEquipmentData] = useState<IEquipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncError, setSyncError] = useState<string>('');

  const equipmentSync = useCallback(async () => {
    try {
      const data = await fetchAllEquipments();
      setEquipmentData(data);
    } catch (error) {
      console.error('Error while fetching the equipment request:', error);
      setSyncError('Error while fetching the equipment request');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    equipmentSync();
  }, [equipmentSync]);

  return {
    equipmentData,
    loading,
    syncError,
    refresh: equipmentSync,
  };
};

export default useEquipment;
