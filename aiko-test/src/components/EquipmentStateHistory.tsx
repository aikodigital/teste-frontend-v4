// components/EquipmentStateHistory.tsx

import React from 'react';
import { useStore } from '../lib/zustand/store';
import StateIndicator from './StateIndicator';
import { formatDate, calculateTimeDifference, getHourlyEarningValue } from '../utils';

interface EquipmentStateHistoryProps {
  equipmentId: string;
  onClose: () => void;
}

const EquipmentStateHistory: React.FC<EquipmentStateHistoryProps> = ({ equipmentId, onClose }) => {
  const { 
    getEquipmentStateHistory,
    equipments,
    equipmentModels
  } = useStore();
  
  const stateHistory = getEquipmentStateHistory(equipmentId);
  const equipment = equipments.find(e => e.id === equipmentId);
  const model = equipment ? equipmentModels.find(m => m.id === equipment.equipmentModelId) : null;
  
  if (!equipment || !model) {
    return null;
  }

  // Calculate durations and earnings
  const historyWithDurations = stateHistory.map((item, index) => {
    const nextItem = stateHistory[index + 1];
    let duration = '---';
    let earnings = 0;
    
    if (nextItem) {
      duration = calculateTimeDifference(nextItem.date, item.date);
      const hours = new Date(item.date).getTime() - new Date(nextItem.date).getTime();
      const hourlyValue = getHourlyEarningValue(model, item.state.id);
      earnings = (hours / (1000 * 60 * 60)) * hourlyValue;
    }
    
    return {
      ...item,
      duration,
      earnings
    };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{equipment.name}</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="mb-2">
        <p className="text-sm text-gray-600">Modelo: {model.name}</p>
      </div>
      
      <h3 className="font-semibold mb-2">Histórico de Estados</h3>
      
      <div className="overflow-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duração</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {historyWithDurations.map((record, index) => (
              <tr key={index}>
                <td className="px-3 py-2 whitespace-nowrap">
                  <StateIndicator state={record.state} size="sm" />
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(record.date)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record.duration}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record.earnings > 0 ? `R$ ${record.earnings.toFixed(2)}` : '---'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentStateHistory;