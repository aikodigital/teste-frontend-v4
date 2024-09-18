import React, { useState } from 'react';
import Modal from 'react-modal';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface StateHistoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedEquipmentHistory: any[];
  equipmentStates: any[];
}

const StateHistoryModal: React.FC<StateHistoryModalProps> = ({
  isOpen,
  onRequestClose,
  selectedEquipmentHistory,
  equipmentStates,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('Todos'); // Filtro selecionado

  // Função para filtrar os dados com base no filtro selecionado
  const filteredHistory = selectedEquipmentHistory.filter((state) => {
    const stateDetails = equipmentStates.find((eqState) => eqState.id === state.equipmentStateId);
    if (selectedFilter === 'Todos') {
      return true;
    }
    return stateDetails ? stateDetails.name === selectedFilter : false;
  });

  // Função para exportar os dados filtrados para XLSX (Excel)
  const exportToXLSX = () => {
    const worksheetData = filteredHistory.map((state) => {
      const stateDetails = equipmentStates.find((eqState) => eqState.id === state.equipmentStateId);
      return {
        Data: new Date(state.date).toLocaleString(),
        Estado: stateDetails ? stateDetails.name : 'Estado desconhecido',
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Histórico de Estados');
    XLSX.writeFile(workbook, 'historico_de_estados.xlsx');
  };

  // Função para exportar os dados filtrados para PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
  
    const tableData = filteredHistory.map((state) => {
      const stateDetails = equipmentStates.find((eqState) => eqState.id === state.equipmentStateId);
      return [new Date(state.date).toLocaleString(), stateDetails ? stateDetails.name : 'Estado desconhecido'];
    });
  
    autoTable(doc, {
      head: [['Data', 'Estado']],
      body: tableData,
    });
  
    doc.save('historico_de_estados.pdf');
  };

  return (
<Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  contentLabel="Histórico de Posições"
  ariaHideApp={false}
  style={{
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: '75%',
      overflowY: 'scroll',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      zIndex: 1050, 
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1040,  
    },
  }}
>
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Histórico de Estados</h2>
        <button
          onClick={onRequestClose}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Fechar
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center mb-4 gap-4">
        <label htmlFor="state-filter" className="text-gray-600 font-medium">
          Filtrar por estado:
        </label>
        <select
          id="state-filter"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todos</option>
          {equipmentStates.map((state) => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={exportToXLSX}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Exportar para XLSX
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Exportar para PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        {filteredHistory.length > 0 ? (
          <table className="min-w-full table-auto bg-white border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                  Data
                </th>
                <th className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHistory.map((state, index) => {
                const stateDetails = equipmentStates.find((eqState) => eqState.id === state.equipmentStateId);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {new Date(state.date).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {stateDetails ? stateDetails.name : 'Estado desconhecido'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Nenhum histórico de estado disponível.</p>
        )}
      </div>
    </Modal>
  );
};

export default StateHistoryModal;
