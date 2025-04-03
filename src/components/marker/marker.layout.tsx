import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useEquipmentsHook } from '../../hooks/use-equipments.hook';
import { marker } from '../../assets/image-mapping';

const icon = new Icon({
  iconUrl: marker,
  iconSize: [24, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const MapMarkers = () => {
  const { data } = useEquipmentsHook();

  return (
    <>
      {data.map((machine) => (
        <Marker
          key={machine.id}
          position={[machine.position[0].lat, machine.position[0].lon]}
          icon={icon}
        >
          <Popup>
            <strong>{machine.name}</strong>
            <br />
            Status: {machine.state?.name}
          </Popup>
        </Marker>
      ))}
    </>
  );
};
