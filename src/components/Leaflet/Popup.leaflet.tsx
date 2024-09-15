import React, { useContext, useEffect, useState } from 'react';
import { Popup } from 'react-leaflet';
import MyContext from '../../context/MyContext';
import { FilterState } from '../../interfaces/FilterState.interface';

function PopupLeaflet(props: { currentState: string }) {
  const { currentState } = props;
  const { stateOptions } = useContext(MyContext) as FilterState;
  const [itemStateName, setItemStateName] = useState<string>('');

  useEffect(() => {
    const dataError = 'Erro ao buscar os dados.';
    const getStateInfo = stateOptions.find((item) => item.id === currentState);
    const info = getStateInfo?.name || dataError;

    setItemStateName(info);
  }, [stateOptions]);

  return (
    <Popup>
      <p>{`Este equipamento está: ${itemStateName}`}</p>
      <p>Visualizar todo o histórico do equipamento</p>
    </Popup>
  );
}

export default PopupLeaflet;
