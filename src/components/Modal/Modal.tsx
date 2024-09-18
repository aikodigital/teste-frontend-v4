import React from 'react';
import './Modal.styles.scss';
import { useContextApi } from '../../context/ContextApi';

interface IModal {
  onClose: () => void;
  equipIdSelect: string;
}

function Modal({ onClose, equipIdSelect }: IModal) {
  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClose();
    }
  };

  console.log('id: ', equipIdSelect);

  const {
    equipaments,
    equipamentsModel,
    equipamentsStateHistory,
    equipamentsState,
  } = useContextApi();

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleString('pt-BR', {
      timeZone: 'UTC',
      dateStyle: 'short', // 'short', 'medium', 'long', 'full'
      timeStyle: 'short', // 'short', 'medium', 'long'
    });
  }

  function getName(equiId: string) {
    const [{ name }] = equipaments.filter((item) => item.id === equiId);
    return name;
  }

  function getModel(equiId: string) {
    const [{ equipmentModelId }] = equipaments.filter(
      (item) => item.id === equiId
    );
    const [{ name }] = equipamentsModel.filter(
      (item) => item.id === equipmentModelId
    );
    return name;
  }

  function getSituation(equiId: string) {
    const [{ states }] = equipamentsStateHistory.filter(
      (item) => item.equipmentId === equiId
    );
    const lastState = states[states.length - 1];
    const [{ name, color }] = equipamentsState.filter(
      (item) => item.id === lastState.equipmentStateId
    );
    return (
      <p>
        Situação:{' '}
        <span style={{ color: `${color}`, fontWeight: 'bold' }}>{name}</span>
      </p>
    );
  }

  function getNewSituation(equiId: string) {
    const [{ name, color }] = equipamentsState.filter(
      (item) => item.id === equiId
    );
    return (
      <p>
        Situação:{' '}
        <span style={{ color: `${color}`, fontWeight: 'bold' }}>{name}</span>
      </p>
    );
  }

  function getState(equiId: string) {
    const [{ states }] = equipamentsStateHistory.filter(
      (item) => item.equipmentId === equiId
    );
    const lastState = states[states.length - 1];
    return formatDate(lastState.date);
  }

  function stateHistory(equiId: string) {
    const filteredHistory = equipamentsStateHistory.filter(
      (item) => item.equipmentId === equiId
    );

    if (filteredHistory.length > 0) {
      const [{ states }] = filteredHistory;

      if (states) {
        return states
          .slice()
          .reverse()
          .map((item) => (
            <div key={item.date} className="states">
              <p>Data: {formatDate(item.date)}</p>
              {getNewSituation(item.equipmentStateId)}
            </div>
          ));
      }
    }

    return <p>Nada</p>;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={handleOverlayKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Close modal"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <button type="button" className="close" onClick={onClose}>
          Fechar
        </button>
        <div className="container-title">
          <p>Nome: {getName(equipIdSelect)}</p>
          <p>Modelo: {getModel(equipIdSelect)}</p>
          {getSituation(equipIdSelect)}
          <p>Última Atualização: {getState(equipIdSelect)}</p>
        </div>
        <div className="container-body">{stateHistory(equipIdSelect)}</div>
      </div>
    </div>
  );
}

export default Modal;
