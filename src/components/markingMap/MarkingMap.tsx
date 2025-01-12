import { Marker } from '@react-google-maps/api'
import './making.css';
import { useContext } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Header from '../header/Header';
import { 
  // estadoEquipamento,
  modeloContext,
  modeloEquipament, 
  position,
  // horasTrabalhadas, 
  // historicoEquipamento,
} from '../../context/ModeloContext';

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
  // const { stateEquipment } = useContext(estadoEquipamento)
  // const { worked } = useContext(horasTrabalhadas)
  // const {equipmentHistory } = useContext(historicoEquipamento)
  
  console.log(equipamentoId.modelEquipment, equipamentoId.datePosition);
  // console.log(modelo);
  // console.log(positions);
  
  
  // console.log(modelo[0].id);
  
  const filterModelo = modelo.filter((model) => model.name === equipamentoId.modelEquipment)
  // console.log(filterModelo);
  
  const filterPosition = positions.filter((position) => position.equipmentId === filterModelo[0].id)
  console.log(filterPosition);
  
  // const filterState = worked.filter((state) => state.id === filterModelo[0].equipmentModelId)
  // const filterState = equipmentHistory.filter((state) => state.equipmentId === filterModelo[0].id)
  // const filterStateEquipment = filterState.filter((e) => e.states[0].date === filterPosition[0].positions[0].date)
  // console.log(filterStateEquipment[0].states);
  
  // const [hoverInfo, setHoverInfo] = useState("");
  
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
              // position={center}
              position={{
                lat: position.positions[0].lat, // não funcionou
                lng: position.positions[0].lon
              }}
              
              // onMouseOver={() => setHoverInfo("ola")}
              // onMouseOut={() => setHoverInfo("ol")}
              // onClick={() => setHoverInfo()}
              // options={{
              //   label: {
              //     text: hoverInfo || equipamentoId,
              //     className:'label-marker',
              //   }
              // }}
            />
          ))}
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </>
  ) : (
    <></>
  )
}
