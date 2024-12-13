import { Marker } from '@react-google-maps/api'
import './making.css';
import { useContext } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Header from '../header/Header';
import { modeloContext, modeloEquipament, position } from '../../context/ModeloContext';

const center = {
  lat: -19.126536,
  lng: -45.947756,
}

export default function MarkingMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDyRulpfR67VEi9Dk2ZMDJLza8zVFjFM_0',
  })

  const { equipamentoId } = useContext(modeloEquipament); 
  const { modelo } = useContext(modeloContext); // id, equipID, nome
  const { positions } = useContext(position); // equiID, position {data, lat, lon}
  
  const filterModelo = modelo.filter((model) => model.name === equipamentoId)
  // console.log(filterModelo);

  const filterPosition = positions.filter((position) => position.equipmentId === filterModelo[0].id)
  
  // console.log(filterPosition[0].positions);
  
  // const lastPosition = filterPosition[0].positions.length -1
  // console.log(lastPosition);
  
  // const last = filterPosition[0].positions[lastPosition]
  // console.log(filterPosition[0].positions[lastPosition])

  return isLoaded ? (
    <>
      <Header />
      <GoogleMap
        mapContainerClassName='size-maps'
        center={center}
        zoom={10}
      >
          {filterPosition.map((position) => (
            <Marker
              key={position.equipmentId}
              position={{
                lat: position.positions[0].lat,
                lng: position.positions[0].lon
              }}
            />
          ))}

        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </>
  ) : (
    <></>
  )
}
