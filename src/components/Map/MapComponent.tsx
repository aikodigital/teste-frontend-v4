import { useMap } from '@/hooks/useMap';

type MapComponentProps = {
  markers: {
    coordinates: [number, number];
    popupValue?: string;
    tooltipValue?: string;
  }[];
};

export const MapComponent = ({ markers }: MapComponentProps) => {
  useMap({ zoom: 10, center: [-19.1673, -46.0034], markers });

  return (
    <div>
      <div id="map" style={{ height: '700px', width: '100vw' }} />
      {/* {markers.length > 0 && markers[0]?.equipmentId && (
        <EquipmentDetails equipmentId={markers[0].equipmentId} />
      )} */}
    </div>
  );
};
