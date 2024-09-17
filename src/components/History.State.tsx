import moment from 'moment';
import 'moment/locale/pt-br';
import '../styles/scroll.css';
import MyContext from '../context/MyContext';
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
      <p className="text-lg font-bold">Histórico do equipamento</p>
      {currentHistory?.states.map((item) => {
        const itemState = stateOptions.find(
          (opt) => opt.id === item.equipmentStateId,
        );

        if (!itemState?.name) return;

        const currentDate = moment.utc(item.date).local();
        const formattedDate = currentDate.format('LLLL');

        const addPreposition =
          itemState?.name === 'Manutenção' ? 'em manutenção' : itemState?.name;

        const formattedItemState =
          addPreposition.toLowerCase() || 'erro ao buscar os dados';

        return (
          <div key={item.date}>
            <p>
              {`Na ${formattedDate}, o equipamento estava `}
              <span className="font-bold">{`${formattedItemState}.`}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default HistoryState;
