import { Marker } from '@react-google-maps/api'
import './making.css';
import { useContext, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Header from '../header/Header';
import { 
  estadoEquipamento,
  modeloContext,
  modeloEquipament, 
  position,
  horasTrabalhadas, 
  historicoEquipamento,
} from '../../context/ModeloContext';
// import { typeEquipments } from '../../types/typeEquipments';

const center = {
  lat: -19.126536,
  lng: -45.947756
}

export default function MarkingMap() {
  const googleKey = import.meta.env.VITE_API_NAME

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleKey,
  })

  const { equipamentoId } = useContext(modeloEquipament); 
  const { modelo } = useContext(modeloContext); // id, equipID, nome
  const { positions } = useContext(position); // equiID, position {data, lat, lon}
  const { stateEquipment } = useContext(estadoEquipamento)
  const { worked } = useContext(horasTrabalhadas)
  const {equipmentHistory } = useContext(historicoEquipamento)
  
  const [hoverInfo, setHoverInfo] = useState<string>("CA-0001");
  // const [filterPosition, setFilterPosition] = useState<[]>([])
  // console.log(filterPosition);
  
  // console.log('Tipo de estado', stateEquipment);
  // console.log('MODELO', modelo);  
  // console.log('historico equipamento', equipmentHistory);
  const filterModelo = modelo.find((model) => model.name === equipamentoId.modelEquipment)
  const filterPosition = positions.filter((position) => position.equipmentId === filterModelo?.id)
    .map((position) => {
      const positionFilter = position.positions.filter((position) => position.date === equipamentoId.datePosition)
      return {
        ...position,
        positions: positionFilter
      }
    })
  console.log(filterPosition);
  
  return isLoaded ? (
    <>
      <Header />
      <GoogleMap
        mapContainerClassName='size-maps'
        center={center}
        zoom={10}
      >
          {filterPosition[0].positions.map((position, index) => (
            <Marker
            key={index}
            // position={center}
            position={{
              lat: position.lat, 
                lng: position.lon,
              }}
              
              onMouseOver={() => setHoverInfo("Esperndo")}
              onMouseOut={() => setHoverInfo(equipamentoId.modelEquipment)}
              // onClick={() => setHoverInfo("click")}
              options={{
                label: {
                  text: hoverInfo === "EEE" ? hoverInfo : equipamentoId.modelEquipment,
                  className:'label-marker',
                }
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
