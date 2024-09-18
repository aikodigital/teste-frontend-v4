import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { EquipamentContext } from "../../Hooks/EquipementContext";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import L from 'leaflet';
import { useState} from 'react'
const ComponentResize = () => {
  const map = useMap();
  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};

const customIcon = L.icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png', 
	iconSize: [25, 41], 
	iconAnchor: [12, 41], 
	popupAnchor: [1, -34], 
	shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png', 
	shadowSize: [41, 41], 
	shadowAnchor: [12, 41], 
  });

const PopUpMaps = ({ position }) => {
  const {
    StateModal,
    dataEquipamentSelected,
    setCoodinateSelected,
    setStateModal,
    findState,
    calculateTotalTimeByState
  } = useContext(EquipamentContext);

  const [stateNow,setStateNow] = useState()



  const totalTimeByState = calculateTotalTimeByState(dataEquipamentSelected?.stateHistory);
  console.log(totalTimeByState);
  const manutentionValue = dataEquipamentSelected?.Model?.hourlyEarnings.find(i=> i?.equipmentStateId === totalTimeByState?.Manutenção?.id ) 
  const operationValue = dataEquipamentSelected?.Model?.hourlyEarnings.find(i=> i?.equipmentStateId === totalTimeByState?.Operando?.id )
  const stopValue = dataEquipamentSelected?.Model?.hourlyEarnings.find(i=> i?.equipmentStateId === totalTimeByState?.Parado?.id ) 


  function formatToBRL(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
  
  // Função que calcula e formata o valor
  function calculateAndFormatValue(valueOne, valueTwo) {
    // if (!stopValue || !totalTimeByState || !stopValue.value || !totalTimeByState.Parado || !totalTimeByState.Parado.value) {
    //   return 'Valor inválido';
    // }
  
    const result = valueOne * valueTwo;
    console.log(valueOne)
    console.log(valueTwo)

    console.log(result)
    return formatToBRL(result);
  }





  if (position === "") return null;
  if (!StateModal) return null;
  console.log({dataEquipamentSelected})







  return (
    <>
      <div className="popup-map">
        <div className="popup-map-content">
          <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
          >
            <Modal.Dialog>
              <Modal.Header onClick={() => setStateModal(false)} closeButton>
                <Modal.Title>{dataEquipamentSelected.Model.name}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <MapContainer
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  center={position}
                  attributionControl={true}
                  zoom={8}
                  minZoom={3}
                  scrollWheelZoom={true}
                >
                  <ComponentResize />
                  <TileLayer
                    // className={'ion-hide'}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} icon={customIcon}>
                    <Popup>
                      <span>
                      {dataEquipamentSelected.Model.name} : {stateNow}
                      </span>
                    </Popup>
                  </Marker>
                </MapContainer>
                <div className="lists-container">
                  <div className="list-history-container">
                    <span>localizações </span>
                    <ListGroup>
                      {dataEquipamentSelected?.positionHistory?.positions?.map(
                        (item) => {
                          const stateID = dataEquipamentSelected?.stateHistory?.states?.find(i => i?.date === item?.date );
                          return (
                            <ListGroup.Item
                              onClick={() => {
                                setCoodinateSelected([item?.lat, item?.lon]);
                                if(stateID){
                                const state = findState(stateID?.equipmentStateId)
                                setStateNow(state?.name)
                              }else{
                                setStateNow("not state")
                              }
                              }}
                            >
                              {item.date}
                            </ListGroup.Item>
                          );
                        }
                      )}
                    </ListGroup>
                  </div>
                  <div className="list-history-container">
                    <span>Operações </span>
                    <ListGroup>
                      {dataEquipamentSelected?.stateHistory?.states?.map(
                        (item) => {
                          const state = findState(item?.equipmentStateId);
                          const position = dataEquipamentSelected?.positionHistory?.positions?.find(i => i.date === item.date );
                          return <ListGroup.Item onClick={()=>{
                            console.log(position,item.date)
                            setStateNow(state?.name)
                              if(position){
                                setCoodinateSelected([position?.lat, position?.lon]);
                              }
                          }}>{state?.name}</ListGroup.Item>;
                        }
                      )}
                    </ListGroup>
                  </div>
                </div>

              </Modal.Body>

              <Modal.Footer>
              <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary">
                    <span>Horas em Manutenção: {totalTimeByState.Manutenção.value} / </span>
                    <span>R$ { calculateAndFormatValue(manutentionValue.value,totalTimeByState.Manutenção.value)}</span>
                  </Button>
                  <Button variant="secondary">
                    <span>Horas Operando: {totalTimeByState.Operando.value} /</span>
                    <span>R$ { calculateAndFormatValue(operationValue.value,totalTimeByState.Operando.value )}</span>
                  </Button>
                  <Button variant="secondary">
                    <span>
                    Horas Parado : {totalTimeByState.Parado.value} / 
                    </span>
                    <span>
                    R$ {calculateAndFormatValue(stopValue.value,totalTimeByState.Parado.value) } 
                    </span>
                    </Button>
                </ButtonGroup>
                <Button
                  variant="secondary"
                  onClick={() => setStateModal(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpMaps;
