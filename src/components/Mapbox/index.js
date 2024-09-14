import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


import equipmentModel from '../../data/equipmentModel.json'
import equipment from '../../data/equipment.json'
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json'
import equipmentState from '../../data/equipmentState.json'
import equipmentStateHistory from '../../data/equipmentStateHistory.json'




// agrega as infos de cada equipamento em um array markers so. 

// nome, modelo, ultima localizacao, ultimo estado

const markers = []

equipment.forEach(item => {

    //armazena na variavel model o nome do modelo do equipamento
    const modelo = equipmentModel.filter((x) => item.equipmentModelId === x.id)[0].name

    //armazena na variavel lastPos a ultima localizacao do equipamento
    const posHistory = equipmentPositionHistory.filter((x) => item.id === x.equipmentId)[0].positions
    const lastPos = posHistory[posHistory.length -1]

    //armazena na variavel stateHistory o ultimo estado do equipamento
    const stateHistory = equipmentStateHistory.filter((x) => item.id === x.equipmentId)[0].states
    const lastStateId = stateHistory[stateHistory.length -1].equipmentStateId
    const lastState = equipmentState.filter((x) => lastStateId === x.id)[0]

    const equipmentMarkers = {...item, model:modelo, lastPos, lastState}

    markers.push(equipmentMarkers)

    
});



console.log(markers)

const mapboxToken = 'pk.eyJ1IjoianBiZXB1IiwiYSI6ImNtMTB5aHgxYjBtNHoycm9xZjNsNnB0ZDEifQ.V56FFWFtPvomXakxb-76_A';

const Mapbox = () => {
    
    
    const [equipmentList, setEquipmentList] = useState() 


    const [viewState, setViewState] = useState({
        latitude: -19.192595,
        longitude: -46.061072,
        zoom: 12,
    });



    return (
    <Map
        {...viewState}
        onMove={e => setViewState(e.viewState)}
        style={{ width: '95vw', height: '80vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxToken}
    >

        {markers.map( ({lastPos, lastState, name, model}) => (

            <>
                <Marker latitude={lastPos.lat} longitude={lastPos.lon} color={lastState.color} />
                <Popup latitude={lastPos.lat} longitude={lastPos.lon} closeButton={true} closeOnClick={false} anchor="top">
                    <div>
                        <h2>{name}</h2>
                        <h2>{model}</h2>
                        <h3>{lastState.name}</h3>
                    </div>
                </Popup>
            </>


        ))}



    </Map>
    );
};

export default Mapbox;