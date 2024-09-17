import MyContext from '../context/MyContext';
import '../styles/scroll.css';
import React, { useContext, useEffect, useState } from 'react';
import { FilterState } from '../interfaces/FilterState.interface';
import AllHistories from '../challenge-info/data/equipmentStateHistory.json';
import { EquipmentStateHistory } from '../interfaces/EquipmentStateHistory.interface';

function HistoryState(props: { itemId: string }) {
  const { itemId } = props;
  const { stateOptions } = useContext(MyContext) as FilterState;
  const [currentHistory, setCurrentHistory] = useState<EquipmentStateHistory>();

  useEffect(() => {
    if (currentHistory) return;

    const getHistory = () => {
      const itemHistory = AllHistories.find(
        (item) => item.equipmentId === itemId,
      );
      setCurrentHistory(itemHistory);
    };

    getHistory();
  }, []);

  return (
    <div className="overflow-y-auto max-h-40">
      <p>Histórico do equipamento</p>
      {currentHistory?.states.map((item) => {
        const itemState = stateOptions.find(
          (opt) => opt.id === item.equipmentStateId,
        );
        return (
          <div key={item.date}>
            <p>Data: {item.date}</p>
            <p>
              O equipamento estava:
              {itemState?.name || 'erro ao buscar os dados'}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default HistoryState;
