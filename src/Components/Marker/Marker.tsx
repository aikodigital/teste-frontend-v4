import img from '../../assets/marker.png';

import { Marker as LeafletMarker, Tooltip } from 'react-leaflet';

import { DataProps } from '../../context/DataContext';

import { useDataContext } from '../../context/DataContext';

import { Icon } from 'leaflet';

const Marker = ({ id, position, name, model, state }: DataProps) => {
  const { setSelectedID } = useDataContext();

  const customIcon = new Icon({
    iconUrl: img,
    iconSize: [24, 24],
  });

  if (!position) return null;

  return (
    <LeafletMarker
      position={position}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          console.log(id);
          setSelectedID(id);
        },
      }}
    >
      <Tooltip>
        <span>{name}</span>
        <span>{model}</span>
        <span>{state}</span>
      </Tooltip>
    </LeafletMarker>
  );
};

export default Marker;
