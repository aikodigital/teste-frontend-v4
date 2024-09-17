import React, { useContext, useEffect, useState } from 'react';
import { Popup } from 'react-leaflet';
import MyContext from '../../context/MyContext';
import { FilterState } from '../../interfaces/FilterState.interface';
import HistoryState from '../History.State';

function PopupLeaflet(props: {
  currentState: string;
  itemId: string;
  itemName: string;
}) {
  const { currentState, itemId, itemName } = props;
  const { stateOptions } = useContext(MyContext) as FilterState;
  const [itemStateName, setItemStateName] = useState<string>('');
  const [showStory, setShowStory] = useState<boolean>(false);

  useEffect(() => {
    const dataError = 'Erro ao buscar os dados.';
    const getStateInfo = stateOptions.find((item) => item.id === currentState);
    const info = getStateInfo?.name || dataError;
    setItemStateName(info);
  }, [stateOptions]);

  useEffect(() => {
    if (itemStateName === 'Manutenção')
      return setItemStateName('Em Manutenção');
  }, [itemStateName]);

  return (
    <Popup>
      <div>
        <h1 className="my-5 font-black">{`O equipamento ${itemName} está: ${itemStateName}`}</h1>
        <button
          onClick={() => setShowStory(!showStory)}
          className={`
        px-4
        py-2
        shadow-md
        font-medium
        rounded-full
        hover:bg-blue-400
      `}
        >
          {showStory ? 'Esconder histórico' : 'Visualizar histórico'}
        </button>

        {showStory ? <HistoryState itemId={itemId} /> : null}
      </div>
    </Popup>
  );
}

export default PopupLeaflet;
