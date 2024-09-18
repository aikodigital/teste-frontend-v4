import React from 'react';
import Modal from 'react-modal';

interface PositionHistoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedEquipmentPositions: any[];
}

const PositionHistoryModal: React.FC<PositionHistoryModalProps> = ({
  isOpen,
  onRequestClose,
  selectedEquipmentPositions,
}) => {
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
        <h2 className="text-2xl font-semibold">Histórico de Posições</h2>
        <button
          onClick={onRequestClose}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Fechar
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            <th className="text-left py-2 px-4 font-medium text-gray-600">Data</th>
            <th className="text-left py-2 px-4 font-medium text-gray-600">Latitude</th>
            <th className="text-left py-2 px-4 font-medium text-gray-600">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {selectedEquipmentPositions.length > 0 ? (
            selectedEquipmentPositions.map((position, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{new Date(position.date).toLocaleString()}</td>
                <td className="py-2 px-4">{position.lat}</td>
                <td className="py-2 px-4">{position.lon}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4" colSpan={3}>
                Nenhum histórico de posição disponível.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Modal>
  );
};

export default PositionHistoryModal;
