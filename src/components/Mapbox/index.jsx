import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const mapboxToken = 'pk.eyJ1IjoianBiZXB1IiwiYSI6ImNtMTB5aHgxYjBtNHoycm9xZjNsNnB0ZDEifQ.V56FFWFtPvomXakxb-76_A';

const Mapbox = () => {
    
    
    const equipmentMarkers = useSelector((state) => state.equipments.filtered)
    console.log(equipmentMarkers)


    const [view, setView] = useState({
        latitude: -19.151801,
        longitude: -46.007759,
        zoom: 10,
    });



    return (
        

    <Map
        {...view}
        onMove={e => setView(e.view)}
        style={{ width: '100%', height: '100%',}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxToken}
    >

        {equipmentMarkers.map( ({lastPos, lastState, name, model}) => (

            <>
                <Marker latitude={lastPos.lat} longitude={lastPos.lon}/>
                <Popup latitude={lastPos.lat} longitude={lastPos.lon} closeOnClick={false} anchor="top" >
                    <div>
                        <h3>{name}</h3>
                        <h3>{model}</h3>
                        <h4 style={{color: lastState.color}}>{lastState.name}</h4>
                    </div>
                </Popup>
            </>


        ))}
    </Map>



    );
};

export default Mapbox;