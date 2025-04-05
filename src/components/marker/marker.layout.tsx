import { Marker, Popup } from 'react-leaflet';
import { Button, Model, Name } from './marker.styles';
import { createMarker } from './marker.utils';
import { Equipment } from '~/hooks/use-equipments.hook';

interface MapMarkerProperties {
  equipment: Equipment;
  onMarkerClick: (machineId: string) => void;
}

export const MapMarkers = ({
  equipment,
  onMarkerClick,
}: MapMarkerProperties) => {
  return (
    <>
      <Marker
        key={equipment.id}
        position={[equipment.position.lat, equipment.position.lon]}
        icon={createMarker(equipment.state.color)}
      >
        <Popup>
          <Name>{equipment.name}</Name>
          <Model>{equipment.model}</Model>
          <Button onClick={() => onMarkerClick(equipment.id)}>
            Ver detalhes
          </Button>
        </Popup>
      </Marker>
    </>
  );
};
