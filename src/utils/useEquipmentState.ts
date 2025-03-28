/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const useEquipmentState = () => {
  const [equipments, setEquipments] = useState<any[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<any | null>(null);
  const [equipmentModels, setEquipmentModels] = useState<any[]>([]);
  const [equipmentStates, setEquipmentStates] = useState<any[]>([]);
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');  
  const [availableDates, setAvailableDates] = useState<string[]>([]); 
  const [selectedEquipmentFilter, setSelectedEquipmentFilter] = useState<string>('');

  return {
    equipments,
    setEquipments,
    selectedEquipment,
    setSelectedEquipment,
    equipmentModels,
    setEquipmentModels,
    equipmentStates,
    setEquipmentStates,
    selectedStateFilter,
    setSelectedStateFilter,
    searchQuery,
    setSearchQuery,
    selectedDate,
    setSelectedDate,
    availableDates,
    setAvailableDates,
    selectedEquipmentFilter,
    setSelectedEquipmentFilter
  };
};
