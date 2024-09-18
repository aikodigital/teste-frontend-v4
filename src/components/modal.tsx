import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EquipmentPositionHistory, EquipmentState, EquipmentStateHistory } from '../data/types';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  equipmentHistory: EquipmentStateHistory[]; // Histórico de estados
    equipmentPositions: EquipmentPositionHistory[]; // Histórico de posições
    equipmentStates: EquipmentState[]; // Lista de todos os estados
};

const Modal = ({ isOpen, onClose, equipmentHistory, equipmentPositions, equipmentStates }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content"  onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon title='Fechar' icon={faTimes} className="close-icon" onClick={onClose} />
        <h4 className="modal-title">Histórico de Estados</h4>
        <div className="modal-infos">
        
        {equipmentHistory.map((history, index) => (
          <div key={index}>
            {history.states.map((state, idx) => {
              const stateInfo = equipmentStates.find(s => s.id === state.equipmentStateId);
              const normalizedStatus = stateInfo?.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
              return (
                <div className='infos-item'>
                  <span className={`icon-${normalizedStatus}`}></span>
                  <span key={idx}>{new Date(state.date).toLocaleString()} - {stateInfo?.name}</span>
                </div>
              );
            })}
          </div>
        ))}
        </div>

        <h4 className="modal-title">Histórico de Posições</h4>
        <div className="modal-infos">
          {equipmentPositions.map((position, index) => (
            <div key={index}>
              {position.positions.map((pos, idx) => (
                <div key={idx} className='infos-item'>
                  <span className='icon-padrao'></span>
                  <span key={idx}>{new Date(pos.date).toLocaleString()} - Lat: {pos.lat}, Lon: {pos.lon}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;