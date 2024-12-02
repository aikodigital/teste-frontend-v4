import { Marker } from '@react-google-maps/api'
import './making.css';
import { useContext, useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Header from '../header/Header';
import { modeloContext, equipmentId } from '../../context/ModeloContext';
import { typeModeloContext } from '../../types/typeModelContext';
import typeEquipments from '../../types/typeEquipments';

const center = {
  lat: -3.745,
  lng: -38.523,
}

export default function MarkingMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDyRulpfR67VEi9Dk2ZMDJLza8zVFjFM_0',
  })

  const [modeloEqui, setModeloEqui] = useState<typeModeloContext>([]);
  // const [equipamento, setEquipamento] = useState<typeEquipments>([]);

  console.log(modeloEqui);
  
  const markingMapEquipment = useContext(modeloContext); // id, equipID, nome
  // const markingMapEquipmentPosition = useContext(equipmentId); // equiID, position {data, lat, lon}

  useEffect(() => {
    setModeloEqui(markingMapEquipment);
    // setEquipamento(markingMapEquipmentPosition);
  }, []);

  // const filterModelo = modeloEqui.filter((item) => item);

  return isLoaded ? (
    <>
      <Header />
      <GoogleMap
        mapContainerClassName='size-maps'
        center={center}
        zoom={10}
      >
        <Marker
          position={center}
         />
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </>
  ) : (
    <></>
  )
}
