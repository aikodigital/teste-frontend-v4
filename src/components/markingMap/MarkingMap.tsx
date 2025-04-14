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
  // horasTrabalhadas, 
  historicoEquipamento,
  horasTrabalhadas,
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
  // const { worked } = useContext(horasTrabalhadas)
  const {equipmentHistory } = useContext(historicoEquipamento) // get date => idState === estadoOpera & color
  
  const [stateCurrent, setStateCurrent] = useState([]);  // função de over mouse
  const [clickState, setClickState] = useState({
    estadoEquipamento: '',
    data: '',
    modelo: '',
    equipamento: '',
  }); 

  const filterModelo = modelo.find((model) => model.name === equipamentoId.modelEquipment)
  const filterPosition = positions.filter((position) => position.equipmentId === filterModelo?.id)
    .map((position) => {
      const positionFilter = position.positions.filter((position) => position.date === equipamentoId.datePosition)
          return {
            ...position,
            positions: positionFilter,
          }
      })
      
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
             
              onMouseOver={() => {
                const idState = equipmentHistory.filter((eq) => eq.equipmentId === filterModelo?.id)
                .map((i) => i.states.filter((a) => a.date === position.date))
                  .map((state) => state.map((i) => i.equipmentStateId))
              
                const c = stateEquipment.filter((i) => i.id === idState[0][0])
                if(c === undefined) {
                  setStateCurrent([]);
                }
                setStateCurrent(c);
                }
              }

              onMouseOut={() => setStateCurrent([])}

              onClick={() => setClickState({
                estadoEquipamento: stateCurrent[0]?.name,
                data: position.date,
                modelo: equipamentoId.modelEquipment,
                equipamento: filterModelo?.equipmentId,
              })}
              
                      
              options={{
                label: {
                  text: stateCurrent[0]?.name,
                  className: 'label-marker',
                  color: stateCurrent[0]?.color,
                }
              }}
              />
            ))}
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
      <ul style={{listStyleType: 'none'}}>
        <li><strong>{clickState.modelo}</strong></li>
        <li>{clickState.data}</li>
        <li>{clickState.equipamento}</li>
        <li>{clickState.estadoEquipamento}</li>
      </ul>
      
    
    </>
  ) : (
    <></>
  )
}
