import React from 'react';
import Modal from 'react-modal';

interface EquipmentHistoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  equipmentId: string;
  history: { date: string; state: string }[]; // Tipo atualizado para refletir o formato esperado
}

const EquipmentHistoryModal: React.FC<EquipmentHistoryModalProps> = ({ isOpen, onRequestClose, equipmentId, history }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Histórico do Equipamento"
      className="fixed inset-0 flex items-center justify-center p-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Histórico do Equipamento {equipmentId}</h2>
        <button
          onClick={onRequestClose}
          className="mb-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fechar
        </button>
        <ul className="list-disc pl-5">
          {history.length > 0 ? (
            history.map((state, index) => (
              <li key={index} className="mb-2">
                <p className="font-semibold">Data:</p> <p>{state.date}</p>
                <p className="font-semibold">Estado:</p> <p>{state.state}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Nenhum histórico disponível.</p>
          )}
        </ul>
      </div>
    </Modal>
  );
};

export default EquipmentHistoryModal;
