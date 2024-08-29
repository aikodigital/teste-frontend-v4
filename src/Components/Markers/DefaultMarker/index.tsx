// import img from '../../../assets/marker.png';

import { Marker as LeafletMarker, Tooltip } from 'react-leaflet';

import { DataProps } from '../../../context/DataContext';

import { useDataContext } from '../../../context/DataContext';
import { customIconFunction } from '../functions';

const Marker = ({ id, position, name, model, state }: DataProps) => {
  const { setSelectedID } = useDataContext();

  if (!position) return null;

  return (
    <LeafletMarker
      position={position}
      icon={customIconFunction(model, state)}
      eventHandlers={{
        click: () => {
          setSelectedID(id);
        },
      }}
    >
      <Tooltip>
        <p>
          <span>Equipamento:</span> <span>{name}</span>
        </p>

        <p>
          <span>Modelo: </span> <span>{model}</span>
        </p>

        <p>
          <span>Estado:</span> <span>{state}</span>
        </p>
      </Tooltip>
    </LeafletMarker>
  );
};

export default Marker;
