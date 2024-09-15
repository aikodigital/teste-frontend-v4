import React from 'react';
import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';
import PopupLeaflet from './Popup.leaflet';
import { EquipmentPropsToMarker } from '../../interfaces/EquipmentProps.interface';

function MarkerLeaflet(props: { item: EquipmentPropsToMarker; key: string }) {
  const {
    item: { currentPosition, currentState /* , equipmentModelId, id, name */ },
  } = props;
  return (
    <Marker
      position={[currentPosition.lat, currentPosition.lon]}
      icon={
        new Icon({
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        })
      }
    >
      <PopupLeaflet currentState={currentState} />
    </Marker>
  );
}

export default MarkerLeaflet;
