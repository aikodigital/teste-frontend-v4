import excavatorGreen from '../../assets/excavator/excavator-green.svg';
import excavatorRed from '../../assets/excavator/excavator-red.svg';
import excavatorYellow from '../../assets/excavator/excavator-yellow.svg';

import truckRed from '../../assets/truck/truck-red.svg';
import truckYellow from '../../assets/truck/truck-yellow.svg';
import truckGreen from '../../assets/truck/truck-green.svg';

import towTruckRed from '../../assets/tow-truck/tow-truck-red.svg';
import towTruckYellow from '../../assets/tow-truck/tow-truck-yellow.svg';
import towTruckGreen from '../../assets/tow-truck/tow-truck-green.svg';

import { Icon } from 'leaflet';

export const customIconFunction = (
  model: string | undefined,
  state: string | undefined
) => {
  let imgModel;

  switch (model) {
    case 'Caminhão de carga':
      switch (state) {
        case 'Operando':
          imgModel = truckGreen;
          break;
        case 'Parado':
          imgModel = truckYellow;
          break;
        case 'Manutenção':
          imgModel = truckRed;
          break;
      }
      break;
    case 'Harvester':
      switch (state) {
        case 'Operando':
          imgModel = towTruckGreen;
          break;
        case 'Parado':
          imgModel = towTruckYellow;
          break;
        case 'Manutenção':
          imgModel = towTruckRed;
          break;
      }
      break;
    case 'Garra traçadora':
      switch (state) {
        case 'Operando':
          imgModel = excavatorGreen;
          break;
        case 'Parado':
          imgModel = excavatorYellow;
          break;
        case 'Manutenção':
          imgModel = excavatorRed;
          break;
      }
      break;
  }

  return new Icon({
    className: 'teste',
    iconUrl: imgModel,
    iconSize: [24, 24],
  });
};
