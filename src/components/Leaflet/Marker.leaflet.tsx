import React, { useContext, useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';
import PopupLeaflet from './Popup.leaflet';
import { EquipmentPropsToMarker } from '../../interfaces/EquipmentProps.interface';
import { Truck } from '../../interfaces/EquipmentModels.interface';
import truckIcon from '../../images/truck-1918551_1280.webp';
import backhoeIcon from '../../images/backhoe-151016_1280.webp';
import harvesterIcon from '../../images/david-brown-1299384_1280.webp';
import MyContext from '../../context/MyContext';
import { FilterState } from '../../interfaces/FilterState.interface';

function MarkerLeaflet(props: { item: EquipmentPropsToMarker; key: string }) {
  const {
    item: { id, currentPosition, currentState, equipmentModelId, name },
  } = props;

  const { equipmentModels } = useContext(MyContext) as FilterState;
  const [currentModel, setCurrentModel] = useState<Truck>();

  useEffect(() => {
    const current = equipmentModels.find(
      (item) => item.id === equipmentModelId,
    );
    setCurrentModel(current);
  }, []);

  const getIcon = () => {
    const clawId = '9c3d009e-0d42-4a6e-9036-193e9bca3199';
    const truckLoadId = 'a3540227-2f0e-4362-9517-92f41dabbfdf';
    const harversterId = 'a4b0c114-acd8-4151-9449-7d12ab9bf40f';

    if (currentModel?.id === clawId)
      return new Icon({
        iconSize: [40, 40],
        iconUrl: backhoeIcon,
        iconRetinaUrl: backhoeIcon,
      });

    if (currentModel?.id === truckLoadId)
      return new Icon({
        iconSize: [30, 17],
        iconUrl: truckIcon,
        iconRetinaUrl: truckIcon,
      });

    if (currentModel?.id === harversterId)
      return new Icon({
        iconSize: [50, 30],
        iconUrl: harvesterIcon,
        iconRetinaUrl: harvesterIcon,
      });

    return new Icon({
      iconSize: [30, 17],
      iconUrl: truckIcon,
      iconRetinaUrl: truckIcon,
    });
  };

  return (
    <Marker
      position={[currentPosition.lat, currentPosition.lon]}
      icon={getIcon()}
    >
      <PopupLeaflet currentState={currentState} itemId={id} itemName={name} />
    </Marker>
  );
}

export default MarkerLeaflet;
