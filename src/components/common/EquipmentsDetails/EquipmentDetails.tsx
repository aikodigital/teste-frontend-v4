import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './EquipmentDetails.module.scss';
import { Close } from '@mui/icons-material';
import { EquipmentStateService } from '../../../services/EquipmentStateService/EquipmentStateService';
import { RootState } from '../../../store/store';
import { IState } from '../../../services/EquipmentStateService/IEquipmentStateService';

interface EquipmentDetailsProps {
  equipmentId: string | null;
  onClose: () => void;
}

const equipment: React.FC<EquipmentDetailsProps> = ({
  equipmentId,
  onClose,
}) => {
  const [stateHistory, setStateHistory] = useState<IState[]>([]);
  const equipment = useSelector((state: RootState) =>
    state.equipment.equipments.find((item) => item.equipmentId === equipmentId)
  );
  const states = useSelector((state: RootState) => state.equipment.states);

  useEffect(() => {
    const fetchDetails = async () => {
      if (equipmentId) {
        const stateService = new EquipmentStateService();
        const history = await stateService.fetchEquipmentState(equipmentId);
        setStateHistory(history?.states || []);
      }
    };

    fetchDetails();
  }, [equipmentId]);

  const getStateDetails = (stateId: string) => {
    console.log('states', states, stateId);
    return states.find((state) => state.id === stateId);
  };

  return (
    <div className={styles.detailsSidebar}>
      <button className={styles.closeButton} onClick={onClose}>
        <Close />
      </button>
      <h2>Detalhes do Equipamento</h2>
      {equipmentId ? (
        <>
          <p>Nome do Equipamento: {equipment?.name}</p>
          <div className={styles.stateHistory}>
            <h3>Histórico de Estados</h3>
            {stateHistory.length > 0 ? (
              <ul>
                {stateHistory.map((state: IState, index: number) => {
                  const stateDetails = getStateDetails(state.equipmentStateId);
                  return (
                    <li
                      key={index}
                      style={{ color: stateDetails?.color || '#000' }}
                    >
                      <p>Data: {state.date}</p>
                      <p>Estado: {stateDetails?.name || 'Desconhecido'}</p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Nenhum histórico disponível.</p>
            )}
          </div>
        </>
      ) : (
        <p>Selecione um equipamento para ver os detalhes.</p>
      )}
    </div>
  );
};

export default equipment;
