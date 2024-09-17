import React from 'react';
import equipmentStateHistory from '../../../data/equipmentStateHistory.json';
import equipmentStateData from '../../../data/equipmentState.json';
import { orderBydate } from '../utils/functions';

function EquipmentHistoryModal({ equipmentId, show, onClose }:any) {
  if (!show) return null; // Não renderiza o modal se não estiver visível

  const auxList = orderBydate(equipmentStateHistory)
  console.log(auxList)
  const equipment = auxList.find(e => e.equipmentId === equipmentId);
  const states = equipment ? equipment.states.map((state) => {
    const stateInfo:any = equipmentStateData.find(s => s.id === state.equipmentStateId);
    return {
      ...state,
      stateName: stateInfo.name,
      stateColor: stateInfo.color
    };
  }) : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Histórico de Estados</h2>
          
        </div>
        <div className="max-h-60 overflow-y-auto ">
          <ul>
            {states.map((state, index) => (
              <li key={index} className="my-2 ">
                <span style={{ color: state.stateColor }}>
                  {state.stateName} - {new Date(state.date).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EquipmentHistoryModal;
